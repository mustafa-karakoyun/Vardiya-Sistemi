'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSchedules, createSchedule, deleteSchedule } from 'lib/api';

// Main Page Component
export default function HomePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await getSchedules();
      // The response from jsonapi-serializer is nested under 'data'
      setSchedules(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch schedules. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSchedule = {
      name: formData.get('name'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
    };

    try {
      await createSchedule(newSchedule);
      setShowModal(false);
      fetchSchedules(); // Refresh the list
    } catch (err) {
      setError('Failed to create schedule.');
      console.error(err);
    }
  };
  
  const handleDeleteSchedule = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await deleteSchedule(id);
        fetchSchedules(); // Refresh the list
      } catch (err) {
        setError('Failed to delete schedule.');
        console.error(err);
      }
    }
  };


  return (
    <div>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>Vardiya Planları</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Yeni Plan Oluştur
        </button>
      </header>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && (
        <div className="row">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{schedule.attributes.name}</h5>
                  <p className="card-text">
                    {schedule.attributes.start_date} - {schedule.attributes.end_date}
                  </p>
                  <Link href={`/schedules/${schedule.id}`} className="btn btn-info me-2">
                    Vardiyaları Görüntüle
                  </Link>
                   <button onClick={() => handleDeleteSchedule(schedule.id)} className="btn btn-danger">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yeni Vardiya Planı</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateSchedule}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Plan Adı</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="start_date" className="form-label">Başlangıç Tarihi</label>
                    <input type="date" className="form-control" id="start_date" name="start_date" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="end_date" className="form-label">Bitiş Tarihi</label>
                    <input type="date" className="form-control" id="end_date" name="end_date" required />
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