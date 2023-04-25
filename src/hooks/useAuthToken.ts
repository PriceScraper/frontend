import {useState} from "react";
import {eraseToken, getToken, storeToken} from "../functions/authTokenStorage";
import initAxiosInterceptors from "../config/axios.config";

export default function useAuthToken() {
    const [token, setToken] = useState<string|null>(getToken())

    function removeToken() {
        eraseToken()
        setToken(null)
    }

    function handleChange(val:string|null) {
        if(val === null) {
            removeToken()
            return;
        }
        storeToken(val)
        initAxiosInterceptors()
        setToken(val)
    }

    return {token, setToken: handleChange}
}
