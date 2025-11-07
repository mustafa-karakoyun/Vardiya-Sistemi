class ShiftSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :start_time, :end_time, :user_id, :schedule_id
end
