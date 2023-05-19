import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {RecipeItem} from "../../../models/Recipe";

export default function RecipeItemCard({recipeItem}: { recipeItem: RecipeItem }) {
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
                </Box>
            </CardContent>
        </Box>
    </Card>
}