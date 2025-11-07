// vardiya_frontend/src/app/schedules/[scheduleId]/page.js
'use client'; // This is a Client Component

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use useParams from next/navigation
import api from '../../../../lib/api'; // Adjust path as needed

export default function ShiftsPage() {
  const params = useParams();
  const scheduleId = params.scheduleId; // Get scheduleId from params

  const [shifts, setShifts] = useState([]);
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftStartTime, setNewShiftStartTime] = useState('');
  const [newShiftEndTime, setNewShiftEndTime] = useState('');
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [editedShiftName, setEditedShiftName] = useState('');
  const [editedShiftStartTime, setEditedShiftStartTime] = useState('');
  const [editedShiftEndTime, setEditedShiftEndTime] = useState('');

  useEffect(() => {
    if (scheduleId) {
      fetchShifts();
    }
  }, [scheduleId]);

  const fetchShifts = async () => {
    try {
      const response = await api.get('/shifts', { params: { schedule_id: scheduleId } });
      // Handle JSONAPI format
      const shiftsData = response.data.data || [];
      const formattedShifts = shiftsData.map(item => ({
        id: item.id,
        name: item.attributes.name,
        start_time: item.attributes.start_time,
        end_time: item.attributes.end_time,
        schedule_id: item.attributes.schedule_id,
        user_id: item.attributes.user_id
      }));
      setShifts(formattedShifts);
    } catch (error) {
      console.error('Error fetching shifts:', error.response || error);
    }
  };

  const handleCreateShift = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/shifts', {
        shift: {
          name: newShiftName,
          start_time: newShiftStartTime,
          end_time: newShiftEndTime,
          schedule_id: scheduleId, // Associate shift with the current schedule
        },
      });
      // Handle JSONAPI format
      const newShift = {
        id: response.data.data.id,
        name: response.data.data.attributes.name,
        start_time: response.data.data.attributes.start_time,
        end_time: response.data.data.attributes.end_time,
        schedule_id: response.data.data.attributes.schedule_id,
        user_id: response.data.data.attributes.user_id
      };
      setShifts([...shifts, newShift]);
      setNewShiftName('');
      setNewShiftStartTime('');
      setNewShiftEndTime('');
      alert('Shift created successfully');
    } catch (error) {
      console.error('Error creating shift:', error.response || error);
      alert('Error creating shift: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleEditShift = (id, currentName, currentStartTime, currentEndTime) => {
    setEditingShiftId(id);
    setEditedShiftName(currentName);
    setEditedShiftStartTime(currentStartTime);
    setEditedShiftEndTime(currentEndTime);
  };

  const handleUpdateShift = async (id) => {
    try {
      const response = await api.put(`/shifts/${id}`, {
        shift: {
          name: editedShiftName,
          start_time: editedShiftStartTime,
          end_time: editedShiftEndTime,
        },
      });
      // Handle JSONAPI format
      const updatedShift = {
        id: response.data.data.id,
        name: response.data.data.attributes.name,
        start_time: response.data.data.attributes.start_time,
        end_time: response.data.data.attributes.end_time,
        schedule_id: response.data.data.attributes.schedule_id,
        user_id: response.data.data.attributes.user_id
      };
      setShifts(shifts.map(shift =>
        shift.id === id ? updatedShift : shift
      ));
      setEditingShiftId(null);
      setEditedShiftName('');
      setEditedShiftStartTime('');
      setEditedShiftEndTime('');
      alert('Shift updated successfully');
    } catch (error) {
      console.error('Error updating shift:', error.response || error);
      alert('Error updating shift: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleDeleteShift = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await api.delete(`/shifts/${id}`);
        setShifts(shifts.filter(shift => shift.id !== id));
        alert('Shift deleted successfully');
      } catch (error) {
        console.error('Error deleting shift:', error.response || error);
        alert('Error deleting shift: ' + (error.response?.data?.message || 'Please try again.'));
      }
    }
  };

  return (
    <div>
      <h2>Shifts for Schedule {scheduleId}</h2>

      <h3>Create New Shift</h3>
      <form onSubmit={handleCreateShift}>
        <div>
          <label htmlFor="new_shift_name">Name:</label>
          <input
            type="text"
            id="new_shift_name"
            data-cy="shift_name"
            value={newShiftName}
            onChange={(e) => setNewShiftName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new_shift_start_time">Start Time:</label>
          <input
            type="time"
            id="new_shift_start_time"
            data-cy="start_time"
            value={newShiftStartTime}
            onChange={(e) => setNewShiftStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new_shift_end_time">End Time:</label>
          <input
            type="time"
            id="new_shift_end_time"
            data-cy="end_time"
            value={newShiftEndTime}
            onChange={(e) => setNewShiftEndTime(e.target.value)}
          />
        </div>
        <button type="submit">Add Shift</button>
      </form>

      <h3>Existing Shifts</h3>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            {editingShiftId === shift.id ? (
              <form onSubmit={() => handleUpdateShift(shift.id)}>
                <input
                  type="text"
                  data-cy="shift_name"
                  value={editedShiftName}
                  onChange={(e) => setEditedShiftName(e.target.value)}
                />
                <input
                  type="time"
                  data-cy="start_time"
                  value={editedShiftStartTime}
                  onChange={(e) => setEditedShiftStartTime(e.target.value)}
                />
                <input
                  type="time"
                  data-cy="end_time"
                  value={editedShiftEndTime}
                  onChange={(e) => setEditedShiftEndTime(e.target.value)}
                />
                <button type="submit">Save Shift</button>
                <button onClick={() => setEditingShiftId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {shift.name} ({shift.start_time} - {shift.end_time})
                <button onClick={() => handleEditShift(shift.id, shift.name, shift.start_time, shift.end_time)}>Edit</button>
                <button onClick={() => handleDeleteShift(shift.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
