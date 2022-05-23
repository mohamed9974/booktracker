import http from '../http-common';


class BookhookService {

    //getters

    //get all books
    getBooks() {
        return http.get("/bookhooks");
    }
    //get all books by genre
    getBooksbyGenre() {
        return http.get("/bookhooks/genres");
    }//get all books by author
    getBooksbyAuthor() {
        return http.get("/bookhooks/authors");
    }
    openBook(id) {
        return http.get(`/bookhooks/${id}`);
    }
    getReviewsbyBook(id) {
        return http.get(`/bookhooks/${id}/reviews`);
    }
    getReviewsbyReader(id) {
        return http.get(`/bookhooks/reviews/${id}`);
    }
    //querys 
    //find by title
    findByTitle(title) {
        return http.get(`/bookhooks?title=${title}`);
    }
    //find by author
    findByauthor(author) {
        return http.get(`/bookhooks?author=${author}`);
    }//find by genre
    findByGenre(genre) {
        return http.get(`/bookhooks?genre=${genre}`);
    }
    //setters
    createBookReview(id, data) {
        return http.post(`/bookhooks/${id}/reviews`, data);
    }
    createReaderReview(id, data) {
        return http.post(`/bookhooks/reviews/${id}`, data);
    }
    updateBookReview(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }
    updateReaderReview(id, data) {
        return http.put(`/bookhooks/reviews/${id}`, data);
    }
    addBook(data) {
        return http.post("/bookhooks", data);
    }
    updateBook(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }


    //destructors
    //destructor for book
    deleteBook(id) {
        return http.delete(`/bookhooks/${id}`);
    }//destructor for review
    deleteBookReview(id) {
        return http.delete(`/bookhooks/${id}`);
    }
}

export default new BookhookService();