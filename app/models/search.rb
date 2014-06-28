class Search < ActiveRecord::Base
  belongs_to :user

  geocoded_by :location
  after_validation :geocode, if: :location_changed?
end
