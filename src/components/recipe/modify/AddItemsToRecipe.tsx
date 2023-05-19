import useItems from "../../../hooks/useItems";
import Recipe from "../../../models/Recipe";
import {Item} from "../../../models/Item";
import {IconButton, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import {useSnackbar} from "notistack";

export default function AddItemsToRecipe({recipe, setRecipe}: { recipe: Recipe, setRecipe: (e: Recipe) => void }) {
    const {items} = useItems()
    const {enqueueSnackbar} = useSnackbar()

    function handleAddItem(itemId: number) {
        axios.post<Recipe>("/recipe/item/add", {recipeId: recipe.id, itemId: itemId})
            .then(res => setRecipe(res.data))
            .catch(err => enqueueSnackbar(`${err.message}`, {variant: "error"}))
    }

    return <div style={{height: "70vh", overflowY: "auto"}}>
        {items.map(i => <AddItemCard key={i.id} item={i} onAdd={() => handleAddItem(i.id)}/>)}
    </div>
}

function AddItemCard({item, onAdd}: { item: Item, onAdd: () => void }) {
    return <div style={{display: "flex", margin: "5px auto"}}>
        <IconButton onClick={onAdd} sx={{my: "auto"}} color={"primary"}>
            <AddIcon/>
        </IconButton>
        <img src={item.image} alt={item.name} style={{maxHeight: 50, maxWidth: 50, margin: "auto 10px"}}/>
        <Typography variant={"subtitle2"} sx={{my: "auto"}}>{item.name}</Typography>
    </div>
}