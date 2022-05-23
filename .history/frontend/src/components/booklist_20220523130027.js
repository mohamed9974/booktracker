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

    <div className="App">
      Hello World
    </div>
  );
}

export default Booklist;
