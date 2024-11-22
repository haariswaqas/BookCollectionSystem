import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrUpdateGenre } from '../services/genreServices';
import 'bootstrap/dist/css/bootstrap.min.css';

const GenreForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateGenre({ name });
      navigate('/genres');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Genre</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Genre Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Genre
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreForm;
