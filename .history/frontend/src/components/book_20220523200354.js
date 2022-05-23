import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";
import { bookstoreOM } from "../models/bookstoreOM";

const Book = (props) => {
  const initialBookState = {
    _id: null,
    author: "",
    book_id: "",
    cover: "",
    description: "",
    editor: "",
    genre: "",
    is_Fiction: "",
    publishDate: "",
    publisher: "",
    rating: "",
    reviews: [],
    title: "",
    translator: "",
  };
  const initialReviewState = {
    _id: null,
    book_id: "",
    book_title: "",
    rating: "",
    review: "",
    reviewer: "",
    title: ""
  };
  const [error, setError] = useState(null);
  const [book, setBook] = useState(initialBookState);
  const [review, setReview] = useState([initialReviewState]);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setBook({ ...book, title: value });
    } else if (name === "genre") {
      setBook({ ...book, genre: value });
    } else if (name === "author") {
      setBook({ ...book, author: value });
    } else if (name === "rating") {
      setBook({ ...book, rating: value });
    } else if (name === "description") {
      setBook({ ...book, description: value });
    }
    else if (name === "editor") {
      setBook({ ...book, editor: value });
    }
    else if (name === "publisher") {
      setBook({ ...book, publisher: value });
    }
    else if (name === "publishDate") {
      setBook({ ...book, publishDate: value });
    }
    else if (name === "translator") {
      setBook({ ...book, translator: value });
    }
    else if (name === "is_Fiction") {
      setBook({ ...book, is_Fiction: value });
    }
    else if (name === "book_id") {
      setBook({ ...book, book_id: value });
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (edit) {
      BookhookService.updateBook(book._id, book)
        .then(response => {
          setBook(response.data);
          setEdit(false);
          ;
        })
        .catch(e => {
          setError(e);

        });
    } else {
      BookhookService.addBook(book)
        .then(response => {
          setBook(response.data);
          ;
        })
        .catch(e => {
          setError(e);

        });
    }
  }
  // loading Book with id
  const loadBook = () => {
    BookhookService.getBook(props.match.params.id)
      .then(response => {
        setBook(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const loadAuthor = () => {
    BookhookService.openBook(props.match.params.id)
      .then(response => {
        setAuthor(response.data.author);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const loadGenre = () => {
    BookhookService.openBook(props.match.params.id)
      .then(response => {
        setGenre(response.data.genre);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const loadRating = () => {
    BookhookService.openBook(props.match.params.id)
      .then(response => {
        setReview(response.data.rating);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const loadReviews = () => {
    BookhookService.getReviewsbyBook(props.match.params.id)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  // UPDATE BOOK
  const updateBook = (book) => {
    BookhookService.updateBook(book)
      .then(response => {
        setBook(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const handleDelete = (event) => {
    event.preventDefault();

    BookhookService.deleteBook(book._id)
      .then(response => {
        props.history.push("/");
        ;
      })
      .catch(e => {
        setError(e.response.data.message);
        ;
      });
  }
  const addReview = (event) => {
    event.preventDefault();

    BookhookService.createBookReview(props.match.params.id, review)
      .then(response => {
        setReview(response.data);
        setReview({
          _id: null,
          rating: 0,
          comment: "",
          reviewer: "",
          book: "",
          review: "",
          title: ""
        });
        ;
      })
      .catch(e => {
        setError(e);
        ;
      });
  }

  const handleUpdateReview = (event) => {
    event.preventDefault();

    BookhookService.updateReaderReview(review)
      .then(response => {
        setReview(review.map(review => review._id === response.data._id ? response.data : review));
        setReview({
          _id: null,
          book_id: "",
          book_title: "",
          rating: 0,
          review: "",
          reviewer: "",
          title: ""
        });
      })
      .catch(e => {
        setError(e.response.data.message);
        ;
      });
  }
  const handleDeleteReview = (event) => {
    event.preventDefault();

    BookhookService.deleteReaderReview(review._id)
      .then(response => {
        setReview(review.filter(review => review._id !== response.data._id));
        setReview({
          _id: null,
          rating: "",
          comment: "",
          reviewer: "",
          book: "",
        });
        useEffect(() => {
          BookhookService.getBook(props.match.params.id)
            .then(response => {
              setBook(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }, [props.match.params.id]);

        useEffect(() => {
          loadBook();
          loadAuthor();
          loadGenre();
          loadRating();
          loadReviews();
        }, [props.match.params.id]);

        return (
          <div className="App">
            Hello World.
          </div>
        );
      }
export default Book;
