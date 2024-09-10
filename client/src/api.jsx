import axios from "axios";

const api = axios.create({
    baseURL: "https://barbearia-server.vercel.app/api/v1",
});

export default api;
