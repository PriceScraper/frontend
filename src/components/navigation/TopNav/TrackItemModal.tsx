import {useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useForm} from "react-hook-form";
import axios from "axios";

export default function TrackItemModalButton() {
    const [open, setOpen] = useState(false)

    return <>
        <IconButton onClick={() => setOpen(true)}>
            <AddIcon/>
        </IconButton>
        <TrackItemModal open={open} handleClose={() => setOpen(false)}/>
    </>
}

function TrackItemModal(props: { open: boolean, handleClose: () => void }) {
    const {register, getValues} = useForm()

    async function onSubmit() {
        const response = await axios.post("/items", {url: getValues("url")})
        console.log(response.data)
    }

    return <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Track item</DialogTitle>
        <DialogContent>
            <TextField margin={"dense"} label={"URL to item"} {...register("url")} fullWidth/>
            <Button onClick={onSubmit}>Start tracking</Button>
        </DialogContent>
    </Dialog>
}