class ShiftSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :start_time, :end_time, :schedule_id
end
