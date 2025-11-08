class Shift < ApplicationRecord
  belongs_to :schedule, optional: true
end
