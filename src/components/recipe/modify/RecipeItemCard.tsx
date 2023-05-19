import {Box, Card, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import Recipe, {RecipeItem} from "../../../models/Recipe";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import {useSnackbar} from "notistack";

export default function RecipeItemCard({recipeItem, recipe, setRecipe}: {
    recipeItem: RecipeItem,
    recipe: Recipe,
    setRecipe: (e: Recipe) => void
}) {
    const {enqueueSnackbar} = useSnackbar()

    if (recipe.items === null) return <></>

    function handleAddItem() {
        axios.post<Recipe>("/recipe/item/add", {recipeId: recipe.id, itemId: recipeItem.item.id})
            .then(res => setRecipe(res.data))
            .catch(err => enqueueSnackbar(`${err.message}`, {variant: "error"}))
    }

    function handleRemoveItem() {
        axios.post<Recipe>("/recipe/item/remove", {recipeId: recipe.id, itemId: recipeItem.item.id})
            .then(res => setRecipe(res.data))
            .catch(err => enqueueSnackbar(`${err.message}`, {variant: "error"}))
    }

    return <Card sx={{display: 'flex', boxShadow: "none", m: 0.5}}>
        <CardMedia
            component="img"
            sx={{width: 100, mx: 2}}
            image={recipeItem.item.image}
            alt={recipeItem.item.name}
        />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flex: '1 0 auto'}}>
                <Box sx={{my: "auto"}}>
                    <Typography component="div" variant="h6" sx={{my: "auto"}}>
                        {recipeItem.item.name}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                        <IconButton aria-label="reduct" onClick={handleRemoveItem}>
                            <RemoveIcon/>
                        </IconButton>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {recipeItem.quantity}
                        </Typography>
                        <IconButton aria-label="add" onClick={handleAddItem}>
                            <AddIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Box>
    </Card>
}