class Workshop < ActiveRecord::Base
has_many :blocks, :dependent => :destroy
accepts_nested_attributes_for :blocks, :reject_if => lambda { |a| a[:title].blank? }, :allow_destroy => true
mount_uploader :foto, AvatarUploader
mount_uploader :imagen, ImageUploader
mount_uploader :q_ic1, ProjectUploader


extend FriendlyId
  friendly_id :nombre, use: :slugged
end
