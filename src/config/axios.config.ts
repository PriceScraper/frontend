import axios from "axios";
import {getToken} from "../functions/authTokenStorage";

axios.defaults.baseURL = "http://localhost:8080"
export default function initAxiosInterceptors() {
    axios.interceptors.request.clear()
    axios.interceptors.request.use((conf) => {
        const token = getToken()
        if(token !== null) conf.headers.Authorization = `${token}`
        return conf
    })
}
