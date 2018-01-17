class Workshop < ActiveRecord::Base

mount_uploader :foto, AvatarUploader
mount_uploader :imagen, ImageUploader
mount_uploader :q_ic1, ProjectUploader


extend FriendlyId
  friendly_id :nombre, use: :slugged
end
