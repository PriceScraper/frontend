import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";
import axios from "axios";
import {Button, Tooltip, Typography} from "@mui/material";
import ScanBarcodeFromCamera from "../../components/item/ScanBarcodeFromCamera";
import {useSnackbar} from "notistack";

export default function ScanItem() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [scanTooltipOpen, setScanTooltipOpen] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setScanTooltipOpen(true);
            console.log("tooltip open");
        }, 7000);
    }, []);

    function onSuccess(value: string) {
        setError(false);
        axios
            .get<{ succeeded: boolean; result: string }>(`/items/code?q=${value}`)
            .then((res) => {
                if (res.data.succeeded)
                    navigate(`/items/search?q=${res.data.result}`);
                else setError(true);
            })
            .catch((err) => onError(`${err.message}`));
    }

    function onError(err: string) {
        enqueueSnackbar(`${err}`, {variant: "error", preventDuplicate: true});
    }

    return (
        <MainContainer backTrackableTo={"/"} headerMsg={"Scan product"}>
            <>
                {error ? (
                    <>
                        <Typography variant={"h6"}>
                            Helaas! We konden geen resultaten vinden voor de gescande barcode.
                        </Typography>
                        <br/>
                        <Button color={"warning"}>Probeer opnieuw</Button>
                    </>
                ) : (
                    <>
                        <Typography
                            sx={{
                                marginTop: "-0.5rem",
                                marginBottom: "1rem",
                                color: "#343a40",
                            }}
                            variant={"subtitle1"}
                        >
                            Scan de barcode van een product om het op te zoeken
                        </Typography>
                        <Tooltip
                            placement={"top-end"}
                            open={scanTooltipOpen}
                            title={"Breng de barcode dichtbij de camera"}
                        >
                            <div></div>
                        </Tooltip>

                        <ScanBarcodeFromCamera onSuccess={onSuccess} onError={onError}/>
                    </>
                )}
            </>
        </MainContainer>
    );
}
