import {Item} from "../../models/Item";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import {useSnackbar} from "notistack";
import axios from "axios";

export default function AddRecurringItemModal(props: { open: boolean, handleClose: () => void, item: Item }) {
    const [quantity, setQuantity] = useState(1)
    const {enqueueSnackbar} = useSnackbar()

    function handleQuantityChange(addVal: 1 | -1) {
        if (quantity + addVal < 1) return;
        setQuantity(quantity + addVal)
    }

    function handleSubmit() {
        axios.post("/shoppinglists/items/add/recurring", {itemId: props.item.id, quantity})
            .then(() => {
                enqueueSnackbar("Terugkerend product is toegevoegd aan uw shopping lists.", {variant: "success"})
                props.handleClose()
            })
            .catch(err => enqueueSnackbar(`${err.message}`, {variant: "error"}))
    }

    return <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>
            Terugkerend product
        </DialogTitle>
        <DialogContent>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    fontSize: "1.1rem",
                }}>
                <div>
                    {`${props.item.name}`}
                </div>
                <div>
                    {`x${quantity}`}
                </div>
                <div>
                    <ChangeQuantityBtn handleChange={handleQuantityChange} changeBy={-1}/>
                    <ChangeQuantityBtn handleChange={handleQuantityChange} changeBy={1}/>
                </div>
            </div>
            <Divider sx={{my: 2}}/>
            <Caption/>
        </DialogContent>
        <DialogActions>
            <Button color={"error"} onClick={props.handleClose}>Afbreken</Button>
            <Button color={"success"} onClick={handleSubmit}>Voeg toe</Button>
        </DialogActions>
    </Dialog>
}

function ChangeQuantityBtn(props: { handleChange: (e: 1 | -1) => void, changeBy: 1 | -1 }) {
    return <IconButton
        sx={{width: "2rem", height: "2rem"}}
        onClick={() => props.handleChange(props.changeBy)}
        color={"primary"}
        data-testid={`changeValueBtn${props.changeBy}`}
    >
        {props.changeBy < 0 ? <RemoveIcon/> : <AddIcon/>}
    </IconButton>
}

function Caption() {
    return <Typography variant={"caption"}>
        Dit product zal automatisch aan al uw boodschappenlijsten toegevoegd worden.
        U kunt de hoeveelheid van dit product manueel per boodschappenlijst wijzigen.
        Indien u het product niet meer automatisch in uw boodschappenlijst toegevoegd wilt hebben
        kunt u dit verwijderen op de Instellingen pagina.
    </Typography>
}

