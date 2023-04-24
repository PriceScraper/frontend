import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const {token} = useParams<{token:string|undefined}>()
    const navigate = useNavigate()
    const {isAuthenticated, setToken} = useAuth()

    useEffect(() => {
        if(isAuthenticated) navigate("/")
        else if(token !== undefined) {
            setToken(token)
        }
        navigate("/")
    })

    return <>
        Processing authentication...
    </>
}
