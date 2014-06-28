class User < ActiveRecord::Base
  has_many :searches

  validates :uid, :token, :name, presence: true
  validates :email, uniqueness: { case_sensitive: false }

  # for twitter log in
  def self.from_omniauth(auth)
    where(auth.slice('provider', 'uid')).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
      user.nickname = auth['info']['nickname']
      user.location = auth['info']['location']
      user.image = auth['info']['image']
      user.token = auth['credentials']['token']
      user.secret = auth['credentials']['secret']
    end
  end
end
