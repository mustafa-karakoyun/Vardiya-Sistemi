class Shift < ApplicationRecord
  belongs_to :user, optional: true # Made optional as authentication is removed
  belongs_to :schedule, optional: true
end
