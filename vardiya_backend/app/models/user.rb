class User < ApplicationRecord
  has_many :shifts
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # Devise authentication removed as per user request
end
