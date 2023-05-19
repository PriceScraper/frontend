import AddIcon from "@mui/icons-material/Add";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Recipe from "../../../models/Recipe";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import useAuth from "../../../hooks/useAuth";

export default function NewShoppingListFromRecipe(props: { recipe: Recipe }) {
    const {isAuthenticated} = useAuth()
    const [open, setOpen] = useState(false)

    if (!isAuthenticated) return <></>
    return <>
        <Button onClick={() => setOpen(true)}><AddIcon sx={{mr: 0.5}}/> Nieuwe Boodschappenlijst</Button>
        <FormDialog open={open} handleClose={() => setOpen(false)} recipe={props.recipe}/>
    </>
}

function FormDialog(props: { open: boolean, handleClose: () => void, recipe: Recipe }) {
    const {register, getValues} = useForm()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    async function handleSubmit() {
        if (getValues("title").length < 3) {
            enqueueSnackbar("De naam van de boodschappenlijst moet minstens 3 karakters lang zijn.", {variant: "info"})
            return;
        }
        await axios.post("/shoppinglists/recipe", {title: getValues("title"), recipe: props.recipe})
        navigate("/shopping-lists")
    }

    return <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Nieuwe boodschappenlijst</DialogTitle>
        <DialogContent>
            <TextField margin={"dense"} label={"Titel"} {...register("title")} />
        </DialogContent>
        <DialogActions>
            <Button color={"error"} onClick={props.handleClose}>Annuleer</Button>
            <Button color={"success"} onClick={handleSubmit}>Maak</Button>
        </DialogActions>
    </Dialog>
}