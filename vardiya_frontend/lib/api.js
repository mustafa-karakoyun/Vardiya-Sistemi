const API_URL = "http://localhost:3000/api/v1";

async function fetcher(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) {
    return null; // No content
  }
  return response.json();
}

// Schedule Functions
export function getSchedules() {
  return fetcher('/schedules');
}

export function getSchedule(id) {
  return fetcher(`/schedules/${id}`);
}

export function createSchedule(data) {
  return fetcher('/schedules', {
    method: 'POST',
    body: JSON.stringify({ schedule: data }),
  });
}

export function updateSchedule(id, data) {
  return fetcher(`/schedules/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ schedule: data }),
  });
}

export function deleteSchedule(id) {
  return fetcher(`/schedules/${id}`, {
    method: 'DELETE',
  });
}

// Shift Functions
export function getShifts() {
    return fetcher('/shifts');
}

export function getShift(id) {
    return fetcher(`/shifts/${id}`);
}

export function createShift(data) {
    return fetcher('/shifts', {
        method: 'POST',
        body: JSON.stringify({ shift: data }),
    });
}

export function updateShift(id, data) {
    return fetcher(`/shifts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ shift: data }),
    });
}

export function deleteShift(id) {
    return fetcher(`/shifts/${id}`, {
        method: 'DELETE',
    });
}