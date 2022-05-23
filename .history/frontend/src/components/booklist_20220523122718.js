import React, {useState,useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";


const  Booklist = (props) => {
  const [books, setBooks] = useState([]);
  const [findByauthor, setFindByauthor] = useState("");
  const [findBytitle, setFindBytitle] = useState("");
  const [findByGenre, setFindByGenre] = useState("All Genres");
  const [findByreaders, setFindByreaders] = useState("All readers");

  useEffect(() => {
    BookhookService.getBooks()
    .then(response => {
      console.log(response.data);
      setBooks(response.data.books);
    })
    .catch(e => {
      console.log(e);
    });
  }, []);

  const handleFindByauthor = (event) => {
    setFindByauthor(event.target.value);
  };

  const handleFindBytitle = (event) => {
    setFindBytitle(event.target.value);
  };

  const handleFindByGenre = (event) => {
    setFindByGenre(event.target.value);
  };

  const handleFindByreaders = (event) => {
    setFindByreaders(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    BookhookService.getBooks()
    .then(response => {
      setBooks(response.data);
    })
    .catch(e => {
      console.log(e);
    });

    BookhookService.getBooksByAuthor(findByauthor)
    .then(response => {
      setBooks(response.data);
    })
    .catch(e => {
      console.log(e);
    });

    BookhookService.getBooksByTitle(findBytitle)
    .then(response => {
      setBooks(response.data);
    })
    .catch(e => {
      console.log(e);
    });

    BookhookService.getBooksByGenre(findByGenre)
    .then(response => {
      setBooks(response.data);
    })
    .catch(e => {
      console.log(e);
    });

    BookhookService.getBooksByReaders(findByreaders)
    .then(response => {
      setBooks(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };



  return (

    <div className="App">
      Hello World
    </div>
  );
}

export default Booklist;
