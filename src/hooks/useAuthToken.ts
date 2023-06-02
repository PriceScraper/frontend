import {useState} from "react";
import {
    eraseTokens,
    getAccessToken,
    getRefreshToken,
    storeAccessToken,
    storeRefreshToken
} from "../functions/authTokenStorage";
import initAxiosInterceptors from "../config/axios.config";
import useInterval from "./useInterval";

export default function useAuthToken() {
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken())
    useInterval(() => {
        //console.log("Updating access token, new: ", getAccessToken())
        setAccessToken(getAccessToken())
    }, 55)

    function removeTokens() {
        eraseTokens()
        setAccessToken(null)
    }

    function handleAccessTokenChange(val: string | null) {
        if (val === null) {
            removeTokens()
            return;
        }
        storeAccessToken(val)
        setAccessToken(val)
    }

    function handleRefreshTokenChange(val: string | null) {
        if (val === null) {
            removeTokens()
            return;
        }
        storeRefreshToken(val)
    }

    function handleChange(refresh: string | null, access: string | null) {
        handleAccessTokenChange(access)
        handleRefreshTokenChange(refresh)
        initAxiosInterceptors()
    }

    return {accessToken, refreshToken: getRefreshToken(), setTokens: handleChange}
}
