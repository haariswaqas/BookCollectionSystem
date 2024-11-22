import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Welcome to the Book Management System</h1>
        <div className="d-grid gap-3 col-md-6 mx-auto">
          <Link to="/books" className="text-decoration-none">
            <button className="btn btn-primary btn-lg w-100">View Books</button>
          </Link>
          <Link to="/add-genre" className="text-decoration-none">
            <button className="btn btn-success btn-lg w-100">Add Genre</button>
          </Link>
          <Link to="/add-book" className="text-decoration-none">
            <button className="btn btn-info btn-lg w-100">Add Book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
