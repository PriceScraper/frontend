import {useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useForm} from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import {useSnackbar} from "notistack";

export default function TrackItemModalButton() {
    const [open, setOpen] = useState(false)
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated) return <>Not authenticated</>

    return <>
        <IconButton id={"trackItemModalButton"} onClick={() => setOpen(true)}
                    sx={{color: "white"}}>
            <AddIcon/>
        </IconButton>
        <TrackItemModal open={open} handleClose={() => setOpen(false)}/>
    </>
}

export function TrackItemModal(props: { open: boolean, handleClose: () => void }) {
    const {register, getValues, setValue} = useForm()
    const {enqueueSnackbar} = useSnackbar()

    function onSubmit() {
        axios.post("/items/track", {url: getValues("url")})
            .then(() => {
                enqueueSnackbar("Successfully started tracking item.", {variant: "success"})
                props.handleClose()
                setValue("url", "")
            })
            .catch(err => enqueueSnackbar(`${err.response.data}`, {variant: "error"}))
    }

    return <Dialog role={"trackItemModal"} open={props.open} onClose={props.handleClose}>
        <DialogTitle>Track item</DialogTitle>
        <DialogContent>
            <TextField margin={"dense"} label={"URL to item"} {...register("url")} fullWidth/>
            <Button onClick={onSubmit}>Start tracking</Button>
        </DialogContent>
    </Dialog>
}