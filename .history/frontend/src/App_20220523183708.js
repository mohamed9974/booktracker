import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap

import AddReview from "./components/addReview";
import Booklist from "./components/booklist";
import Login from "./components/login";
import Book from "./components/book";


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }


  return (

    <div >
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand" to="/book">Bookstore</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/addReview">Add Review</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booklist">Booklist</Link>
            </li>
            <li className="nav-item">
              {user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }} href="/login">Logout {user.name}</a>)

                : (<Link className="nav-link" to="/login">Login</Link>
                )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Booklist />} />
          <Route path="/book/:id/addReview"
            render={(props) => (<AddReview {...props} user={< AddReview />} />)} />
          <Route path="/book/:id"
            render={(props) => (<Book {...props} user={<Book/>} />)} />
          <Route path="/login"
            render={(props) => (<Login {...props} login={<Login />} />)} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
