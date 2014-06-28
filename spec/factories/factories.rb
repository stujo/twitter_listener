# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  sequence :uid do |n|
    "23497869#{n}"
  end

  sequence :token do |n|
    "sdfirjfsn#{n}"
  end

  factory :user do
    name 'John Smith'
    nickname 'Shorty'
    email nil
    uid '23433322'
    image 'http://eofdreams.com/data_images/dreams/image/image-01.jpg'
    token '2343-dfsfjskjdfrh'
    provider 'twitter'

  end

  factory :search do
    search_terms 'robots'
    user
  end

end
