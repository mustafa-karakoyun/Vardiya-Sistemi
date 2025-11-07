class MakeUserIdNullableInShifts < ActiveRecord::Migration[7.1]
  def change
    change_column_null :shifts, :user_id, true
  end
end