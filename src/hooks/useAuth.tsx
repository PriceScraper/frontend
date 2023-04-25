import React, {createContext, useContext, useMemo} from "react";
import useAuthToken from "./useAuthToken";
import jwt_decode from "jwt-decode";
import User from "../entities/User";

const Auth = createContext<{
    isAuthenticated: boolean,
    token: string|null,
    setToken: (e:string|null) => void,
    user: User|null
}>({
    isAuthenticated: false,
    token: null,
    setToken: () => {},
    user: null
})

export function AuthProvider(props:{children:React.ReactNode}) {
    const tokenHandler = useAuthToken()

    const isAuthenticated = useMemo(() => {
        return tokenHandler.token !== null
    }, [tokenHandler])

    const user = useMemo(() => {
        if(tokenHandler.token === null) return null;
        return jwt_decode<User>(tokenHandler.token)
    }, [tokenHandler])

    return <Auth.Provider value={{isAuthenticated, token: tokenHandler.token, setToken: tokenHandler.setToken, user}}>
        {props.children}
    </Auth.Provider>
}

export default function useAuth() {
    return useContext(Auth)
}
