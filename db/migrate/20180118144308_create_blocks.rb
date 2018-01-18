class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.string :title
      t.text :content
      t.string :duration
      t.references :workshop, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
