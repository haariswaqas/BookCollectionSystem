import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/genres');
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Genres</h1>
      <Link to="/add-genre">Add New Genre</Link>
      <div>
        {genres.map(genre => (
          <div key={genre._id}>
            <h3>{genre.name}</h3>
            <Link to={`/edit-genre/${genre._id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
