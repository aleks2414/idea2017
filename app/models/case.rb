class Case < ActiveRecord::Base
	mount_uploader :exito_imagen, ExitUploader
	mount_uploader :loguito, LoguitoUploader

  extend FriendlyId
  friendly_id :nombre, use: :slugged
end
