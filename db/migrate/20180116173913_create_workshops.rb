class CreateWorkshops < ActiveRecord::Migration
  def change
    create_table :workshops do |t|
      t.string :nombre
      t.string :frase
      t.datetime :fecha
      t.string :lugar
      t.string :horario
      t.string :formato
      t.string :precio
      t.string :num_meto
      t.string :num_dina
      t.string :num_herra
      t.text :dirigido
      t.text :descripcion
      t.text :detalles
      t.string :expositor
      t.string :puesto
      t.text :cv
      t.string :foto
      t.string :test_link
      t.string :imagen
      t.string :q_tit1
      t.string :q_ic1
      t.string :q_des1
      t.string :q_tit2
      t.string :q_ic2
      t.string :q_des2
      t.string :q_tit3
      t.string :q_ic3
      t.string :q_des3
      t.string :q_tit4
      t.string :q_ic4
      t.string :q_des4
      t.string :des_tit1
      t.string :des_des1
      t.string :des_tit2
      t.string :des_des2
      t.string :des_tit3
      t.string :des_des3
      t.string :des_tit4
      t.string :des_des4

      t.timestamps null: false
    end
  end
end
