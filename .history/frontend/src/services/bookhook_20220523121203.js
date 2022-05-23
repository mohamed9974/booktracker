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
    findByReader(reader) {
        return http.get(`/bookhooks?reader=${reader}`);
    }
    findByRating(rating) {
        return http.get(`/bookhooks?rating=${rating}`);
    }
}

export default new BookhookService();