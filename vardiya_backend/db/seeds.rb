# Clear existing data
Shift.destroy_all
Schedule.destroy_all

# Create Schedules
schedule1 = Schedule.create!(
  name: "November 2025",
  start_date: Date.new(2025, 11, 1),
  end_date: Date.new(2025, 11, 30)
)

schedule2 = Schedule.create!(
  name: "December 2025",
  start_date: Date.new(2025, 12, 1),
  end_date: Date.new(2025, 12, 31)
)

# Create Shifts for November Schedule
Shift.create!([
  { name: "Morning Shift", start_time: DateTime.new(2025, 11, 1, 8, 0, 0), end_time: DateTime.new(2025, 11, 1, 16, 0, 0), schedule: schedule1 },
  { name: "Evening Shift", start_time: DateTime.new(2025, 11, 1, 16, 0, 0), end_time: DateTime.new(2025, 11, 2, 0, 0, 0), schedule: schedule1 },
  { name: "Night Shift", start_time: DateTime.new(2025, 11, 2, 0, 0, 0), end_time: DateTime.new(2025, 11, 2, 8, 0, 0), schedule: schedule1 }
])

# Create Shifts for December Schedule
Shift.create!([
  { name: "Morning Shift", start_time: DateTime.new(2025, 12, 1, 8, 0, 0), end_time: DateTime.new(2025, 12, 1, 16, 0, 0), schedule: schedule2 },
  { name: "Evening Shift", start_time: DateTime.new(2025, 12, 1, 16, 0, 0), end_time: DateTime.new(2025, 12, 2, 0, 0, 0), schedule: schedule2 }
])

puts "Seed data created successfully!"
puts "Created #{Schedule.count} schedules."
puts "Created #{Shift.count} shifts."