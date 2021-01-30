import axios from "axios";

const API = axios.create({
    baseURL: 'https://tecklink-server.herokuapp.com/api',
})

export default API
