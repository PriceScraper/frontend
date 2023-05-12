import axios from "axios";
import {getAccessToken} from "../functions/authTokenStorage";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
export default function initAxiosInterceptors() {
    axios.interceptors.request.clear()
    axios.interceptors.request.use((conf) => {
        const token = getAccessToken()
        if(token !== null) conf.headers.Authorization = `${token}`
        return conf
    })
}
