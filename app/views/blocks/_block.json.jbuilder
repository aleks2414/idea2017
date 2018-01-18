json.extract! block, :id, :title, :content, :duration, :workshop_id, :created_at, :updated_at
json.url block_url(block, format: :json)
