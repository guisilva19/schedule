import axios from "axios";

const Api = axios.create({
    baseURL: "https://contacts-no1k.onrender.com"
})

export default Api