import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap

import AddReview from "./components/addReview";
import Booklist from "./components/booklist";
import Login from "./components/login";
import Book from "./components/book";


function App() {
  const user = React.useState("");
  return (

    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Bookstore</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/addReview">Add Review</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booklist">Booklist</Link>
            </li>
            <li className="nav-item">
              {user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }} href="#">Logout {user.name}</a>)

                : (<Link className="nav-link" to="/login">Login</Link>
                )}

            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">Book</Link>
            </li>
          </ul>


        </div>
      </nav>
    </div>
  );
}
export default App;
