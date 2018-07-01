class AddSlugToCase < ActiveRecord::Migration
  def change
    add_column :cases, :slug, :string
    add_index :cases, :slug, unique: true
    add_column :cases, :loguito, :string
  end
end
