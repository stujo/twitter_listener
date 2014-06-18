class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :nickname
      t.string :email
      t.string :uid
      t.string :location
      t.string :image
      t.string :token
      t.datetime :token_expiry

      t.timestamps
    end
  end
end
