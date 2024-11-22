import React from 'react';
import { Link } from 'react-router-dom';
import  BookList  from '../lists/BookList';
import GenreList from '../lists/GenreList';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Welcome to the Book Collection System</h1>
        
        {/* Grid Layout for Buttons */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* View Books Button */}
          <div className="col">
            <Link to="/view-books" className="text-decoration-none">
              <button className="btn btn-primary btn-lg w-100">View Books</button>
            </Link>
          </div>

          {/* Add Genre Button */}
          <div className="col">
            <Link to="/add-genre" className="text-decoration-none">
              <button className="btn btn-success btn-lg w-100">Add Genre</button>
            </Link>
          </div>

          {/* Add Book Button */}
          <div className="col">
            <Link to="/add-book" className="text-decoration-none">
              <button className="btn btn-info btn-lg w-100">Add Book</button>
            </Link>
          </div>

   
          {/* Manage Genres Button */}
          <div className="col">
            <Link to="/view-genres" className="text-decoration-none">
              <button className="btn btn-dark btn-lg w-100">Manage Genres</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
      <GenreList />
      </div>
      <div>
      <BookList />
      </div>
      
    </div>
  );
};

export default Home;
