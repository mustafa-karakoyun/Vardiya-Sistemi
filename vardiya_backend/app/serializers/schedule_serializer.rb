class ScheduleSerializer
  include JSONAPI::Serializer
  attributes :name, :start_date, :end_date

  has_many :shifts
end
