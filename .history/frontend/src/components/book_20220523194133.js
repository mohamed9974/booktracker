import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";
import { bookstoreOM } from "../models/bookstoreOM";

const Book = (props) => {
  const initialState = {
    _id: null,
    title: "",
    genre: "",
    author: "",
    rating: "",
    reviews: [""],
  };
  }
  useEffect(() => {
    BookhookService.getBook(props.match.params.id)
      .then(response => {
        setBook(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.match.params.id]);
  const [book, setBook] = useState(initialState);
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [edit, setEdit] = useState(false);
  const [newReview, setNewReview] = useState([{
    _id: null,
    rating: 0,
    reviewer: "",
    book_id: props.match.params.id,
    review: "",
    title: ""
  }]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "book") {
      setBook({ ...book, title: value });
    } else if (name === "genre") {
      setBook({ ...book, genre: value });
    } else if (name === "author") {
      setBook({ ...book, author: value });
    } else if (name === "rating") {
      setBook({ ...book, rating: value });
    } else if (name === "ratingEdit") {
      setRating({ ...rating, rating: value });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (edit) {
      BookhookService.updateBook(book._id, book)
        .then(response => {
          setBook(response.data);
          setEdit(false);
          setLoading(false);
        })
        .catch(e => {
          setError(e);
          setLoading(false);
        });
    } else {
      BookhookService.addBook(book)
        .then(response => {
          setBook(response.data);
          setLoading(false);
        })
        .catch(e => {
          setError(e);
          setLoading(false);
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
        setAuthors(response.data.author);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const loadGenre = () => {
    BookhookService.openBook(props.match.params.id)
      .then(response => {
        setGenres(response.data.genre);
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
    setLoading(true);
    BookhookService.deleteBook(book._id)
      .then(response => {
        props.history.push("/");
        setLoading(false);
      })
      .catch(e => {
        setError(e.response.data.message);
        setLoading(false);
      });
  }
  const addReview = (event) => {
    event.preventDefault();
    setLoading(true);
    BookhookService.createBookReview(props.match.params.id, newReview)
      .then(response => {
        setReview(response.data);
        setNewReview({
          _id: null,
          rating: 0,
          comment: "",
          reviewer: "",
          book: "",
          review: "",
          title: ""
        });
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }

  const handleUpdateReview = (event) => {
    event.preventDefault();
    setLoading(true);
    BookhookService.updateReaderReview(newReview)
      .then(response => {
        setReview(review.map(review => review._id === response.data._id ? response.data : review));
        setNewReview({
          _id: null,
          rating: "",
          comment: "",
          reviewer: "",
          book: "",
        });
        setLoading(false);
      })
      .catch(e => {
        setError(e.response.data.message);
        setLoading(false);
      });
  }
  const handleDeleteReview = (event) => {
    event.preventDefault();
    setLoading(true);
    BookhookService.deleteBookReview(newReview._id)
      .then(response => {
        setReview(review.filter(review => review._id !== newReview._id));
        setNewReview({
          _id: null,
          rating: "",
          reviewer: "",
          book: "",
        });
        setLoading(false);
      })
      .catch(e => {
        setError(e.response.data.message);
        setLoading(false);
      });
  }


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
