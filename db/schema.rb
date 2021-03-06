# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180701154417) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blocks", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.string   "duration"
    t.integer  "workshop_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "blocks", ["workshop_id"], name: "index_blocks_on_workshop_id", using: :btree

  create_table "cases", force: :cascade do |t|
    t.string   "nombre"
    t.string   "reto"
    t.text     "solucion"
    t.text     "resultados"
    t.string   "exito_imagen"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "slug"
    t.string   "loguito"
  end

  add_index "cases", ["slug"], name: "index_cases_on_slug", unique: true, using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "workshops", force: :cascade do |t|
    t.string   "nombre"
    t.string   "frase"
    t.datetime "fecha"
    t.string   "lugar"
    t.string   "horario"
    t.string   "formato"
    t.string   "precio"
    t.string   "num_meto"
    t.string   "num_dina"
    t.string   "num_herra"
    t.text     "dirigido"
    t.text     "descripcion"
    t.text     "detalles"
    t.string   "expositor"
    t.string   "puesto"
    t.text     "cv"
    t.string   "foto"
    t.string   "test_link"
    t.string   "imagen"
    t.string   "q_tit1"
    t.string   "q_ic1"
    t.string   "q_des1"
    t.string   "q_tit2"
    t.string   "q_ic2"
    t.string   "q_des2"
    t.string   "q_tit3"
    t.string   "q_ic3"
    t.string   "q_des3"
    t.string   "q_tit4"
    t.string   "q_ic4"
    t.string   "q_des4"
    t.string   "des_tit1"
    t.string   "des_des1"
    t.string   "des_tit2"
    t.string   "des_des2"
    t.string   "des_tit3"
    t.string   "des_des3"
    t.string   "des_tit4"
    t.string   "des_des4"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "slug"
    t.string   "fechas"
    t.string   "titulos"
    t.string   "descripciones"
    t.string   "keywords"
  end

  add_index "workshops", ["slug"], name: "index_workshops_on_slug", unique: true, using: :btree

  add_foreign_key "blocks", "workshops"
end
