import http from '../http-common';


class ReaderhookService {
    getAll() {
        return http.get("/readerhooks");
    }

    getReader(id) {
        return http.get(`/readerhooks/${id}`);
    }

    addReader(data) {
        return http.post("/readerhooks", data);
    }

    updateReader(id, data) {
        return http.put(`/readerhooks/${id}`, data);
    }
    addReaderReview(id, data) {
        return http.put(`/readerhooks/${id}`, data);
    }
    deleteReader(id) {
        return http.delete(`/readerhooks/${id}`);
    }
    findByName(name) {
        return http.get(`/readerhooks?name=${name}`);
    }
    findByEmail(email) {
        return http.get(`/readerhooks?email=${email}`);
    }
    findByPhone(phone) {
        return http.get(`/readerhooks?phone=${phone}`);
    }
}

export default new ReaderhookService();