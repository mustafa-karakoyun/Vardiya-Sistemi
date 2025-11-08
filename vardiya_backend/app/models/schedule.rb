class Schedule < ApplicationRecord
  has_many :shifts, dependent: :destroy
end
