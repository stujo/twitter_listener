class SearchesController < ApplicationController
  respond_to :json

  def index
    @searches = Search.all

    respond_with(searches) do |format|
      format.json { render :json => searches.as_json}
    end
  end

  def show
    # use this to load tweets and send search results for one search:
    # create a client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key  = ENV['TWITTER_KEY'] 
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.access_token  = current_user.token
      config.access_token_secret = current_user.secret
    end
    # use client to bring back tweets
    # create empty array to fill with  3 tweets (for now). TODO: update to handle lots of tweets
    search_results = []
    client.search("robots", :result_type => "recent").take(3).each do |tweet|
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

  def create 
    respond_with Search.create(search_params)

  end 

  private

  def search_params
    params.require(:search).permit(:search_terms, :user_id)
  end

end
