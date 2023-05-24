import {useState} from "react";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";
import axios from "axios";
import {Button, Typography} from "@mui/material";
import ScanBarcodeFromCamera from "../../components/item/ScanBarcodeFromCamera";
import {useSnackbar} from "notistack";

export default function ScanItem() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    function onSuccess(value: string) {
        if (value.length === 13) {
            setError(false)
            axios
                .get<{ succeeded: boolean, result: string }>(`/item/scan?q=${value}`)
                .then(res => {
                    if (res.data.succeeded) navigate(`/item/${res.data.result}`)
                    else setError(true)
                })
                .catch(err => onError(`${err.message}`))
        } else {
            onError(`Barcode has wrong format. Barcode: ${value}`)
        }
    }

    function onError(err: string) {
        enqueueSnackbar(`${err}`, {variant: "error"})
    }

    return <MainContainer backTrackableTo={"/"} headerMsg={"Scan product"}>
        <>
            {error
                ? <>
                    <Typography variant={"h6"}>Helaas! We konden geen resultaten vinden voor de gescande
                        barcode.</Typography>
                    <br/>
                    <Button color={"warning"}>Probeer opnieuw</Button>
                </>
                : <>
                    <Typography variant={"subtitle1"}>Houdt de barcode heel dicht bij de camera.</Typography>
                    <ScanBarcodeFromCamera onSuccess={onSuccess} onError={onError}/>
                </>
            }
        </>
    </MainContainer>
}
