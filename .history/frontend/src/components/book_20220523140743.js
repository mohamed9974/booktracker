import React, {useState,useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap



const Book() = (props) => {
  const initialState = {
    book: null,
    genres: ["All Genres"],
    authors: ["All Authors"],
    findBytitle: "",
    findByauthor: "",

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(["All Genres"]);
  const [authors, setAuthors] = useState(["All Authors"]);
  const [findBytitle, setFindBytitle] = useState("");
  const [findByauthor, setFindByauthor] = useState("");
  const [findByGenre, setFindByGenre] = useState("");
  useEffect(() => {
    
  return (
    <div className="App">
      Hello World.
    </div>
  );
}

export default Book;
