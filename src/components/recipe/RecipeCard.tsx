import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Recipe from "../../models/Recipe";
import {Avatar, Box, CardMedia} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import green from "@mui/material/colors/green";

export default function RecipeCard({recipe}: { recipe: Recipe }) {
    const navigate = useNavigate()

    return <Card sx={{display: 'flex', boxShadow: "none", border: "1px solid black", cursor: "pointer", m: 0.5}}
                 onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flex: '1 0 auto', my: "auto"}}>
                <Typography component="div" variant="h5">
                    {recipe.title}
                </Typography>
                <Typography component="div" variant="subtitle2">
                    Gemaakt door {recipe.creator.username}
                </Typography>
            </CardContent>
        </Box>
        <CardMedia sx={{my: "auto", mx: 2}}>
            <Avatar sx={{w: 56, h: 56, bgcolor: green[500]}}>
                <MenuBookIcon/>
            </Avatar>
        </CardMedia>
    </Card>
}
