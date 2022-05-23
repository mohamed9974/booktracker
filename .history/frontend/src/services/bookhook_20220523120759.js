import http from '../http-common';


class BookhookService {
    getAll() {
        return http.get("/bookhooks");
    }

    get(id) {
        return http.get(`/bookhooks/${id}`);
    }

    create(data) {
        return http.post("/bookhooks", data);
    }

    update(id, data) {
        return http.put(`/bookhooks/${id}`, data);
    }

    delete(id) {
        return http.delete(`/bookhooks/${id}`);
    }
}

export default new BookhookService();