import http from '../http-common';


class BookhookService {
    getAll() {
        return http.get("/bookhooks");
    }

    openBook(id) {
        return http.get(`/bookhooks/${id}`);
    }

    addBook(data) {
        return http.post("/bookhooks", data);
    }

    updateBook(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }

    deleteBook(id) {
        return http.delete(`/bookhooks/${id}`);
    }
    findByTitle(title) {
        return http.get(`/bookhooks?title=${title}`);
    }
    findByauthor(author) {
        return http.get(`/bookhooks?author=${author}`);
    }
    findByGenre(genre) {
        return http.get(`/bookhooks?genre=${genre}`);
    }
    createReview(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }
    updateBookReview(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }
    deleteBookReview(id) {
        return http.delete(`/bookhooks/${id}`);
    }
}

export default new BookhookService();