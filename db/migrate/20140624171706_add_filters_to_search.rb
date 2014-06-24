class AddFiltersToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :location, :string
    add_column :searches, :language, :string
    add_column :searches, :screen_name, :string
    add_column :searches, :publish_date, :string
  end
end
