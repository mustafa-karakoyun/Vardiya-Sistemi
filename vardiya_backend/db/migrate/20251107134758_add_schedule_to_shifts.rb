class AddScheduleToShifts < ActiveRecord::Migration[8.1]
  def change
    add_reference :shifts, :schedule, null: true, foreign_key: true
  end
end
