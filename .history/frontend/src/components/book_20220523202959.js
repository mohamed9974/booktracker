import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";
import { bookstoreOM } from "../models/bookstoreOM";


const bookstore = bookstoreOM();
bookstore.init();

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
    reviewer: null,
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


  // DELETE BOOK
  const deleteBook = (book) => {
    BookhookService.deleteBook(book)
      .then(response => {
        setBook(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const addReview = (event) => {
    event.preventDefault();
    BookhookService.createBookReview(book._id, review)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        setError(e);
      });
    BookhookService.createReaderReview(review.reviewer, review)
      .then(response => {
        setReview(response.data);
      }
      )
      .catch(e => {
        setError(e);
      }
      );

  }

  const updateReview = (event) => {
    event.preventDefault();
    BookhookService.updateBookReview(book._id, review)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        setError(e);
      });
    BookhookService.updateReaderReview(review.reviewer, review)
      .then(response => {
        setReview(response.data);
      }
      )
      .catch(e => {
        setError(e);
      }
      );

  }

  const deleteReview = (event) => {
    event.preventDefault();
    BookhookService.deleteReaderReview(review.reviewer, review)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        setError(e);
      });
    BookhookService.deleteBookReview(book._id, review)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        setError(e);
      });
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

  useEffect(() => {
    loadBook();
    loadAuthor();
    loadGenre();
    loadRating();
    loadReviews();
  }, [props.match.params.id]);

  useEffect(() => {
    BookhookService.getReviewsbyBook(props.match.params.id)
      .then(response => {
        setReview(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.match.params.id]);

  const handleDeleteBook = (book) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(book);
    }
  }

  const handleDeleteReview = (review) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      handleDeleteReview(review);
    }
  }

  const handleUpdateReview = (review) => {
    if (window.confirm("Are you sure you want to update this review?")) {
      handleUpdateReview(review);
    }
  }

  const handleUpdateBook = (book) => {
    if (window.confirm("Are you sure you want to update this book?")) {
      updateBook(book);
    }
  }

  const handleUpdateReview = (review) => {
    if (window.confirm("Are you sure you want to update this review?")) {
      handleUpdateReview(review);
    }
  }

  const handleDeleteBook = (book) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(book);
    }
  }

  const handleDeleteReview = (review) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(review);
    }
  }

  const handleUpdateBook = (book) => {
    if (window.confirm("Are you sure you want to update this book?")) {
      updateBook(book);
    }
  }

  const handleUpdateReview = (review) => {
    if (window.confirm("Are you sure you want to update this review?")) {
      handle
    }
  }

  return (
    <div className="App">
      Hello World.
    </div>
  );
}
export default Book;
