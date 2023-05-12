import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const {accessToken, refreshToken} = useParams<{
        accessToken: string | undefined,
        refreshToken: string | undefined
    }>()
    const navigate = useNavigate()
    const {isAuthenticated, setTokens} = useAuth()

    useEffect(() => {
        if (isAuthenticated) navigate("/")
        else if (accessToken !== undefined && refreshToken !== undefined) {
            setTokens(refreshToken, accessToken)
            navigate("/")
        }
    })

    return <>
        Processing authentication...
    </>
}
