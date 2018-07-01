class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :nombre
      t.string :reto
      t.text :solucion
      t.text :resultados
      t.string :exito_imagen

      t.timestamps null: false
    end
  end
end
