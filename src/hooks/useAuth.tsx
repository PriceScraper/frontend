import React, {createContext, useContext, useMemo} from "react";
import useAuthToken from "./useAuthToken";
import jwt_decode from "jwt-decode";
import User from "../entities/User";
import axios from "axios";
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

export function AuthProvider(props: { children: React.ReactNode }) {
    const tokenHandler = useAuthToken()
    useInterval(refreshTokens, 60) //1min

    const isAuthenticated = useMemo(() => {
        return tokenHandler.accessToken !== null
    }, [tokenHandler])

    const user = useMemo(() => {
        if (tokenHandler.accessToken === null) return null;
        return jwt_decode<User>(tokenHandler.accessToken)
    }, [tokenHandler])

    function refreshTokens() {
        if (tokenHandler.refreshToken === null) return;
        if (tokenHandler.accessToken === null) return;
        if (jwt_decode<User>(tokenHandler.accessToken).exp * 1000 < new Date().getTime()) {
            tokenHandler.setTokens(null, null)
            return;
        }
        axios
            .post<{
                refreshToken: string,
                accessToken: string
            }>("/auth/refresh", {refreshToken: tokenHandler.refreshToken})
            .then(res => tokenHandler.setTokens(res.data.refreshToken, res.data.accessToken))
            .catch(err => console.log(err.message))
        //console.log("Refreshing tokens, new refresh: ", tokenHandler.refreshToken)
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
