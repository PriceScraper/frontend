import React, {createContext, useContext, useMemo} from "react";
import useAuthToken from "./useAuthToken";
import jwt_decode from "jwt-decode";
import User from "../entities/User";
import axios from "axios";
import {useSnackbar} from "notistack";
import useInterval from "./useInterval";

const Auth = createContext<{
    isAuthenticated: boolean,
    accessToken: string | null,
    refreshToken: string | null,
    setTokens: (refresh: string | null, access: string | null) => void,
    user: User | null
}>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    setTokens: () => {
    },
    user: null
})
export function AuthProvider(props:{children:React.ReactNode}) {
    const tokenHandler = useAuthToken()
    const {enqueueSnackbar} = useSnackbar()
    useInterval(refreshTokens, 60 * 5) //60s * 5 = 5min

    const isAuthenticated = useMemo(() => {
        return tokenHandler.accessToken !== null
    }, [tokenHandler])

    const user = useMemo(() => {
        if (tokenHandler.accessToken === null) return null;
        return jwt_decode<User>(tokenHandler.accessToken)
    }, [tokenHandler])

    function refreshTokens() {
        if (tokenHandler.refreshToken === null) return;
        axios
            .post<{
                refreshToken: string,
                accessToken: string
            }>("/auth/refresh", {refreshToken: tokenHandler.refreshToken})
            .then(res => tokenHandler.setTokens(res.data.refreshToken, res.data.accessToken))
            .catch(err => enqueueSnackbar(err.message, {variant: "error"}))
    }

    return <Auth.Provider value={{
        isAuthenticated,
        accessToken: tokenHandler.accessToken,
        refreshToken: tokenHandler.refreshToken,
        setTokens: tokenHandler.setTokens,
        user
    }}>
        {props.children}
    </Auth.Provider>
}

export default function useAuth() {
    return useContext(Auth)
}