import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";
import axios from "axios";
import {Typography} from "@mui/material";

export default function ScanItem() {
    const navigate = useNavigate()
    const [scanned, setScanned] = useState<string>("")
    const [error, setError] = useState(false)

    useEffect(() => {
        if (scanned.length > 0) {
            setError(false)
            axios
                .get<{ succeeded: boolean, result: string }>(`/item/scan?q=${scanned}`)
                .then(res => {
                    if (res.data.succeeded) navigate(`/item/${res.data.result}`)
                    else setError(true)
                })
        }
    }, [scanned, navigate])

    return <MainContainer backTrackableTo={"/"} headerMsg={"Scan product"}>
        <>
            {error
                &&
                <Typography variant={"h6"}>Helaas! We konden geen resultaten vinden voor de gescande
                    barcode.</Typography>}

        </>
    </MainContainer>
}
