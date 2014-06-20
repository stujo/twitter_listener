require 'spec_helper'

describe User do
  subject { FactoryGirl.create(:user)}

    it 'should have a uid' do
      subject.uid = nil
      subject.should_not be_valid
    end

    it 'should have a unique uid' do
      user2 = FactoryGirl.build(:user, uid: subject.uid)
      user2.should_not be_valid
    end

    it 'should have a twitter token' do
      subject.token = nil
      subject.should_not be_valid
    end

    it 'should have a user name' do
      subject.name = nil
      subject.should_not be_valid
    end

    it 'should have a unique email' do
      subject.email = "email@email.com"
      subject2 = FactoryGirl.build(:user, email: subject.email)
      subject2.email = email
      email.should_not be_valid
    end
  
end
