import axios from "axios";

const api = axios.create({
    baseURL: "https://barbershop-server-ebon.vercel.app/api/v1",
});

export default api;
