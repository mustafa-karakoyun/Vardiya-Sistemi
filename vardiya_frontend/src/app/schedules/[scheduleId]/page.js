'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSchedule, getShifts, createShift, deleteShift } from 'lib/api';

export default function ScheduleDetailPage() {
  const params = useParams();
  const scheduleId = params.scheduleId;

  const [schedule, setSchedule] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (scheduleId) {
      fetchScheduleDetails();
    }
  }, [scheduleId]);

  const fetchScheduleDetails = async () => {
    try {
      setLoading(true);
      const scheduleRes = await getSchedule(scheduleId);
      const shiftsRes = await getShifts();
      
      setSchedule(scheduleRes.data);
      // Filter shifts that belong to the current schedule
      const filteredShifts = shiftsRes.data.filter(
        (shift) => shift.attributes.schedule_id == scheduleId
      );
      setShifts(filteredShifts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch schedule details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShift = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShift = {
      name: formData.get('name'),
      start_time: formData.get('start_time'),
      end_time: formData.get('end_time'),
      schedule_id: scheduleId,
    };

    try {
      await createShift(newShift);
      setShowModal(false);
      fetchScheduleDetails(); // Refresh the list
    } catch (err) {
      setError('Failed to create shift.');
      console.error(err);
    }
  };
  
  const handleDeleteShift = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await deleteShift(id);
        fetchScheduleDetails(); // Refresh the list
      } catch (err) {
        setError('Failed to delete shift.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!schedule) return <p>Schedule not found.</p>;

  return (
    <div>
      <header className="mb-4">
        <Link href="/">&larr; Bütün Planlara Geri Dön</Link>
        <h1 className="mt-2">{schedule.attributes.name}</h1>
        <p className="text-muted">
          {schedule.attributes.start_date} to {schedule.attributes.end_date}
        </p>
      </header>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vardiyalar</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Yeni Vardiya Ekle
        </button>
      </div>

      <div className="list-group">
        {shifts.length > 0 ? (
          shifts.map((shift) => (
            <div key={shift.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{shift.attributes.name}</h5>
                <small>
                  {new Date(shift.attributes.start_time).toLocaleString()} -{' '}
                  {new Date(shift.attributes.end_time).toLocaleString()}
                </small>
              </div>
               <button onClick={() => handleDeleteShift(shift.id)} className="btn btn-sm btn-outline-danger">
                Sil
              </button>
            </div>
          ))
        ) : (
          <p>Bu plana ait vardiya bulunamadı.</p>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yeni Vardiya Ekle</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateShift}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Vardiya Adı</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="start_time" className="form-label">Başlangıç Zamanı</label>
                    <input type="datetime-local" className="form-control" id="start_time" name="start_time" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="end_time" className="form-label">Bitiş Zamanı</label>
                    <input type="datetime-local" className="form-control" id="end_time" name="end_time" required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Kapat</button>
                    <button type="submit" className="btn btn-primary">Oluştur</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}