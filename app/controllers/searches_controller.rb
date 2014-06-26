class SearchesController < ApplicationController
  respond_to :json

  def index
    @searches = current_user.searches.all

    respond_with(@searches) do |format|
      format.json { render :json => @searches.as_json}
    end
  end

  def show
    @search = current_user.searches.find(params[:id])
    # use this to load tweets and send search results for one search:
    # create a client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key  = ENV['TWITTER_KEY'] 
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.access_token  = current_user.token
      config.access_token_secret = current_user.secret
    end
    # use client to bring back tweets
    # create empty array to fill with tweets that are displayed. 
    search_results = []
    # conditionals to load search results from twitter: 
   
    # if screen_name is a filter...
    if @search.screen_name and @search.screen_name.length > 1
      # query the twitter api timeline and set to tweet variable
      tweets = client.user_timeline("#{@search.screen_name}", {count: 200, include_rts: false})

      # regex from google for handling multiple search terms
      search_regex = "^"
      @search.search_terms.split.each do |term|
        search_regex += '(?=.*\b'+term+'\b)'
      end
      search_regex += '.*$'

      # filter tweets from user using regex
      filtered_tweets = tweets.select do |tweet|
        Regexp.new(search_regex, true).match(tweet.full_text)
      end
      # respond with json for loading
      respond_with filtered_tweets
      return
    end

    if @search.location and @search.location.length > 1
      location = "#{@search.latitude},#{@search.longitude},5mi"
    else
      location = nil
    end

    client.search("#{@search.search_terms} #{@search.screen_name}", :result_type => "recent", :lang => "en", :geocode => "#{location}").take(30).each do |tweet|
        search_results << tweet
    end
    
    # return the tweets
    respond_with search_results
  end

  def new 
    @search = Search.new
  end

  def edit
  end

  def update
    #pull up the new search object
    @search = Search.find(params[:id])
    # set the properties of search based on what came back from client update after checking that info was passed in.
    @search.update search_params
    # respond with JSON
    respond_with do |format|
      if @search.update(search_params)
        format.json {  head :no_content}
      else
        format.json {render json: @search.errors, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @search = Search.find(params[:id])
    @search.destroy

    respond_with do |format|
      format.json { head :no_content}
    end
  end

  def create 
    #create and save new search from user 
    new_search = Search.new
    new_search.search_terms = params[:search_terms]
    new_search.user_id = current_user.id

    # confirm search is valid
    if new_search.valid?
      new_search.save!
    else
      render "public/422", :status => 422
      return
    end

    # respond with new search in json
    respond_with(new_search) do |format|
      format.json { render :json => new_search.as_json}
    end
  end 

  private

  def search_params
    params.require(:search).permit(:search_terms, :user_id, :geocode, :location, :screen_name, :publish_date)
  end

end
