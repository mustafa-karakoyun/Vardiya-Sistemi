class RemoveAuthenticationRelatedTablesAndColumns < ActiveRecord::Migration[8.1]
  def change
    # First, remove the foreign key constraint from the shifts table
    remove_foreign_key :shifts, :users if foreign_key_exists?(:shifts, :users)

    # Then, drop the users and jwt_denylists tables
    drop_table :users if table_exists?(:users)
    drop_table :jwt_denylists if table_exists?(:jwt_denylists)

    # Finally, remove the user_id column from the shifts table
    remove_column :shifts, :user_id, :integer if column_exists?(:shifts, :user_id)
  end
end