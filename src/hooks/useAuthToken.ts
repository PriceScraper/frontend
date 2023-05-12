import {useState} from "react";
import {
    eraseTokens,
    getAccessToken,
    getRefreshToken,
    storeAccessToken,
    storeRefreshToken
} from "../functions/authTokenStorage";
import initAxiosInterceptors from "../config/axios.config";

export default function useAuthToken() {
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken())
    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshToken())

    function removeTokens() {
        eraseTokens()
        setAccessToken(null)
        setRefreshToken(null)
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
        setRefreshToken(val)
    }

    function handleChange(refresh: string | null, access: string | null) {
        handleAccessTokenChange(access)
        handleRefreshTokenChange(refresh)
        initAxiosInterceptors()
    }

    return {accessToken, refreshToken, setTokens: handleChange}
}
