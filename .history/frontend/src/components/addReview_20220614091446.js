import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap
import BookhookService from "../services/bookhook";



function AddReview(props) {
  const [review, setReview] = React.useState({
    _id: null,
    bookId: null,
    title: "",
    rating: 0,
    review: "",
    reviewer: ""
  });
  const [book, setBook] = React.useState(null);
  const [reader, setReader] = React.useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview(prevReview => {
      if (name === "rating") {
        return {
          ...prevReview,
          rating: parseInt(value, 10)
        };
      } else if (name === "review") {
        return {
          ...prevReview,
          review: value
        }
      } else if (name === "title") {
        return {
          ...prevReview,
          title: value
        }
      } else if (name === "rating") {
        return {
          ...prevReview,
          rating: parseInt(value, 10)
        };
      }
    }
    );
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

    const handleSubmit = (event) => {
      event.preventDefault();
      if (review._id) {
        updateReview(event);
      } else {
        addReview(event);
      }
    }

    const handleDelete = (event) => {
      event.preventDefault();
      deleteReview(event);
    }




    return (

      <div className="App">

        please add a review

      </div>
    );
  }
}
export default AddReview;
