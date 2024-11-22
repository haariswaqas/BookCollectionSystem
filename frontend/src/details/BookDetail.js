import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById } from '../services/bookServices';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <div>
        <img src={book.image} alt={book.title} />
      </div>
      <div>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <p><strong>Copies Available:</strong> {book.copies_left}</p>
      </div>
      <div>
        <Link to={`/edit-book/${id}`}>
          <button>Edit Book</button>
        </Link>
        <Link to="/books">
          <button>Back to Books</button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
