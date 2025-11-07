// vardiya_frontend/src/app/schedules/page.js
'use client'; // This is a Client Component

import React, { useState, useEffect } from 'react';
import api from '../../../lib/api'; // Adjust path as needed
import Link from 'next/link';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleStartDate, setNewScheduleStartDate] = useState('');
  const [newScheduleEndDate, setNewScheduleEndDate] = useState('');
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [editedScheduleName, setEditedScheduleName] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get('/schedules');
      setSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching schedules:', error.response || error);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/schedules', {
        schedule: {
          name: newScheduleName,
          start_date: newScheduleStartDate,
          end_date: newScheduleEndDate,
        },
      });
      setSchedules([...schedules, response.data.data]);
      setNewScheduleName('');
      setNewScheduleStartDate('');
      setNewScheduleEndDate('');
      alert('Schedule created successfully');
    } catch (error) {
      console.error('Error creating schedule:', error.response || error);
      alert('Error creating schedule: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleEditSchedule = (id, currentName) => {
    setEditingScheduleId(id);
    setEditedScheduleName(currentName);
  };

  const handleUpdateSchedule = async (id) => {
    // This will likely fail as update route is not defined in backend routes.rb
    try {
      const response = await api.put(`/schedules/${id}`, {
        schedule: {
          name: editedScheduleName,
        },
      });
      setSchedules(schedules.map(schedule =>
        schedule.id === id ? response.data.data : schedule
      ));
      setEditingScheduleId(null);
      setEditedScheduleName('');
      alert('Schedule updated successfully');
    } catch (error) {
      console.error('Error updating schedule:', error.response || error);
      alert('Error updating schedule: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleDeleteSchedule = async (id) => {
    // This will likely fail as delete route is not defined in backend routes.rb
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await api.delete(`/schedules/${id}`);
        setSchedules(schedules.filter(schedule => schedule.id !== id));
        alert('Schedule deleted successfully');
      } catch (error) {
        console.error('Error deleting schedule:', error.response || error);
        alert('Error deleting schedule: ' + (error.response?.data?.message || 'Please try again.'));
      }
    }
  };

  return (
    <div>
      <h2>Schedules</h2>

      <h3>Create New Schedule</h3>
      <form onSubmit={handleCreateSchedule}>
        <div>
          <label htmlFor="new_schedule_name">Name:</label>
          <input
            type="text"
            id="new_schedule_name"
            data-cy="name"
            value={newScheduleName}
            onChange={(e) => setNewScheduleName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new_schedule_start_date">Start Date:</label>
          <input
            type="date"
            id="new_schedule_start_date"
            data-cy="start_date"
            value={newScheduleStartDate}
            onChange={(e) => setNewScheduleStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new_schedule_end_date">End Date:</label>
          <input
            type="date"
            id="new_schedule_end_date"
            data-cy="end_date"
            value={newScheduleEndDate}
            onChange={(e) => setNewScheduleEndDate(e.target.value)}
          />
        </div>
        <button type="submit">New Schedule</button>
      </form>

      <h3>Existing Schedules</h3>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            {editingScheduleId === schedule.id ? (
              <form onSubmit={() => handleUpdateSchedule(schedule.id)}>
                <input
                  type="text"
                  data-cy="edit_name"
                  value={editedScheduleName}
                  onChange={(e) => setEditedScheduleName(e.target.value)}
                />
                <button type="submit">Save Schedule</button>
                <button onClick={() => setEditingScheduleId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <Link href={`/schedules/${schedule.id}`}>
                  {schedule.attributes.name} ({schedule.attributes.start_date} to {schedule.attributes.end_date})
                </Link>
                <button onClick={() => handleEditSchedule(schedule.id, schedule.attributes.name)}>Edit</button>
                <button onClick={() => handleDeleteSchedule(schedule.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
