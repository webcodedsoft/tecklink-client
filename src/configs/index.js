import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:2022/api',
})

export default API
