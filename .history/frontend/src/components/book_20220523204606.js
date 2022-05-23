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


  const handleUpdateBook = (book) => {
    if (window.confirm("Are you sure you want to update this book?")) {
      updateBook(book);
    }
  }

  const handleUpdateReview = (review) => {
    if (window.confirm("Are you sure you want to update this review?")) {
      updateReview(review);
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

  return (
    <div className="container">
      <h2>Book</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{book.title}</h4>
                <p className="card-text">
                  <b>Author: </b> {author.name}
                </p>
                <p className="card-text">
                  <b>Genre: </b> {genre.name}
                </p>
                <p className="card-text">
                  <b>Translator: </b> {book.translator}
                </p>
                <p className="card-text">
                  <b>Is Fiction: </b> {book.is_Fiction}
                </p>
                <p className="card-text">
                  <b>Rating: </b> {book.rating}
                </p>
                <p className="card-text">
                  <b>Reviews: </b> {book.reviews}
                </p>
                <p className="card-text">
                  <b>Book ID: </b> {book.book_id}
                </p>
                <div className="btn-group" role="group">
                  <Link to={`/books/${book._id}/edit`} className="btn btn-primary">Edit</Link>
                  <Link to={`/books/${book._id}/delete`} className="btn btn-danger">Delete</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Reviews</h2>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <b>Reviews</b>
                </h4>
                <ul className="list-group list-group-flush">
                  {review.map((review) => (
                    <li className="list-group-item" key={review._id}>
                      <div className="btn-group" role="group">
                        <Link to={`/books/${book._id}/reviews/${review._id}/edit`} className="btn btn-primary">Edit</Link>
                        <Link to={`/books/${book._id}/reviews/${review._id}/delete`} className="btn btn-danger">Delete</Link>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{review.review_title}</h4>
                        <p className="card-text">{review.review_body}</p>
                        <p className="card-text">
                          <b>Reviewer: </b> {review.reviewer}
                        </p>
                        <p className="card-text">
                          <b>Rating: </b> {review.rating}
                        </p>
                        <p className="card-text">
                          <b>Book ID: </b> {review.book_id}
                        </p>
                        <p className="card-text">
                          <b>Review ID: </b> {review._id}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <b>Add Review</b>
                </h4>
                <form onSubmit={addReview}>
                  <div className="form-group">
                    <label htmlFor="review_title">Review Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="review_title"
                      name="review_title"
                      value={review_title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="review_body">Review Body</label>
                    <input
                      type="text"
                      className="form-control"
                      id="review_body"
                      name="review_body"
                      value={review_body}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reviewer">Reviewer</label>
                    <input
                      type="text"
                      className="form-control"
                      id="reviewer"
                      name="reviewer"
                      value={reviewer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                      type="text"
                      className="form-control"
                      id="rating"
                      name="rating"
                      value={rating}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="book_id">Book ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="book_id"
                      name="book_id"
                      value={book_id}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Book;
