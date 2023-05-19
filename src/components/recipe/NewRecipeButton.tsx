import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import {
    Avatar,
    Box,
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import green from "@mui/material/colors/green";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import axios from "axios";
import Recipe from "../../models/Recipe";
import useRecipes from "../../hooks/useRecipes";

export default function NewRecipeButton() {
    const [isModalOpen, setModalOpen] = useState(false)

    return <>
        <Card sx={{display: 'flex', boxShadow: "none", border: "1px solid black", cursor: "pointer", m: 0.5}}
              onClick={() => setModalOpen(true)}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto', my: "auto"}}>
                    <Typography component="div" variant="h5">
                        Nieuw recept
                    </Typography>
                    <Typography component="div" variant="subtitle2">
                        Stel je eigen recept samen!
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia sx={{my: "auto", mx: 2}}>
                <Avatar sx={{w: 56, h: 56, bgcolor: green[500]}}>
                    <AddIcon/>
                </Avatar>
            </CardMedia>
        </Card>
        <NewRecipeModal open={isModalOpen} handleClose={() => setModalOpen(false)}/>
    </>
}

function NewRecipeModal({open, handleClose}: { open: boolean, handleClose: () => void }) {
    const {register, getValues} = useForm()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const {refreshPersonal} = useRecipes()

    async function onSubmit() {
        try {
            const res = await axios.post<Recipe>("/recipe", {title: getValues("title")})
            enqueueSnackbar(`Recept aangemaakt voor ${res.data.title}`, {variant: "success"})
            navigate(`/recipes/${res.data.id}/modify`)
            handleClose()
            refreshPersonal()
        } catch (err: any) {
            enqueueSnackbar(`${err.message}`, {variant: "error"})
        }
    }

    return <Dialog open={open}>
        <DialogTitle>
            Nieuw recept
        </DialogTitle>
        <DialogContent>
            <TextField label={"Titel"} {...register("title")} fullWidth margin={"dense"}/>
        </DialogContent>
        <DialogActions>
            <Button color={"error"} onClick={handleClose}>Annuleer</Button>
            <Button color={"success"} onClick={onSubmit}>Begin</Button>
        </DialogActions>
    </Dialog>
}