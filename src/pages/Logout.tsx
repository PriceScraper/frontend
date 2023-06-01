import MainContainer from "../components/layout/MainContainer";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import useInterval from "../hooks/useInterval";

export default function Logout() {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(10)
    useInterval(() => {
        if (counter === 1) redirect()
        setCounter(counter - 1)
    }, 1)


    function redirect() {
        navigate("/")
    }

    return <MainContainer headerMsg={"U bent succesvol uitgelogd!"} backTrackableTo={"/"}>
        <p>We zullen u terug naar <span onClick={redirect}>start</span> sturen in {counter} seconden.</p>
    </MainContainer>
}
