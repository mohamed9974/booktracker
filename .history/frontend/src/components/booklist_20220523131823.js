import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";


const Booklist = (props) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(["All Genres"]);
  const [authors, setAuthors] = useState(["All Authors"]);
  const [findBytitle, setFindBytitle] = useState("");
  const [findByauthor, setFindByauthor] = useState("");
  const [findByGenre, setFindByGenre] = useState("");
  useEffect(() => {
    BookhookService.getBooks()
      .then(response => {
        console.log(response.data);
        setBooks(response.data.books);
      })
      .catch(e => {
        console.log(e);
      });
    BookhookService.getBooksByGenre()
      .then(response => {
        console.log(response.data);
        setGenres(["All Genres"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
    BookhookService.getBooksByAuthor()
      .then(response => {
        console.log(response.data);
        setAuthors(["All Authors"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleFindByTitle = (e) => {
    setFindBytitle(e.target.value);
  }
  const handleFindByAuthor = (e) => {
    setFindByauthor(e.target.value);
  }
  const handleFindByGenre = (e) => {
    setFindByGenre(e.target.value);
  }

  const searchhandler = (query, by) => {
    if (by === "title") {
      BookhookService.findByTitle(query)
        .then(response => {
          console.log(response.data);
          setBooks(response.data.books);
        })
        .catch(e => {
          console.log(e);
        });
    } else if (by === "author") {
      if (query === "All Authors") {
        BookhookService.getBooks()
          .then(response => {
            console.log(response.data);
            setBooks(response.data.books);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        BookhookService.findByauthor(query)
          .then(response => {
            console.log(response.data);
            setBooks(response.data.books);
          })
          .catch(e => {
            console.log(e);
          });
      }
    } else if (by === "genre") {
      if (query === "All Genres") {
        BookhookService.getBooks()
          .then(response => {
            console.log(response.data);
            setBooks(response.data.books);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        BookhookService.findByGenre(query)
          .then(response => {
            console.log(response.data);
            setBooks(response.data.books);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }



  return (
    <div>
      <div className="row pb-1">
        <div className="input group col-lg-4">
          <input type="text" className="form-control" placeholder="Search by title" onChange={handleFindByTitle} />
          <button className="btn btn-secondary" onClick={() => searchhandler(findBytitle, "title")}>Search</button>
          <div />
          <div className="input group col-lg-4">
            <select className="form-control" onChange={handleFindByAuthor}>
              {authors.map((author, index) => {
                return <option key={index}>{author}</option>
              })}
            </select>
            <button className="btn btn-secondary" onClick={() => searchhandler(findByauthor, "author")}>Search</button>
          </div>
          <div className="input group col-lg-4">
            <select className="form-control" onChange={handleFindByGenre}>
              {genres.map((genre, index) => {
                return <option key={index}>{genre}</option>
              })}
            </select>
            <button className="btn btn-secondary" onClick={() => searchhandler(findByGenre, "genre")}>Search</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Book rating</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={"/book/" + book._id}>{book.title}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.genre.name}</td>
                    <td>{book.rating}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
export default Booklist;
