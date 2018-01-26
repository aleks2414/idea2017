class AddAtributesToWorkshop < ActiveRecord::Migration
  def change
    add_column :workshops, :fechas, :string
    add_column :workshops, :titulos, :string
    add_column :workshops, :descripciones, :string
    add_column :workshops, :keywords, :string
  end
end
