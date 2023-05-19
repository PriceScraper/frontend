import {useQuery} from "react-query";
import {fetchShoppingListForUser} from "../../../services/shoppinglist.service";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import Recipe from "../../../models/Recipe";
import Typography from "@mui/material/Typography";
import {enqueueSnackbar} from "notistack";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

export default function AddRecipeToShoppingList(props: { recipe: Recipe }) {
    const {isAuthenticated} = useAuth()
    const {
        isLoading: isShoppingListsLoading,
        isError: isShoppingListsError,
        data: shoppingLists,
    } = useQuery(["shoppingLists"], () => fetchShoppingListForUser());
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (!isAuthenticated) return <></>
    if (isShoppingListsLoading) return <></>;
    if (isShoppingListsError) return <></>;
    if (shoppingLists?.length === 0) return <></>;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    async function handleSubmit(id: number) {
        if (props.recipe.items === null) return;
        for (let i = 0; i < props.recipe.items.length; i++) {
            try {
                await axios.post("/shoppinglists/items/add", {
                    shoppingListId: id,
                    itemId: props.recipe.items[i].id,
                    quantity: props.recipe.items[i].quantity
                })
            } catch (err: any) {
                enqueueSnackbar(`${err}`, {variant: "error"})
            }
        }
    }

    function redirectAfterSubmit() {
        navigate("/shopping-lists")
    }

    return <>
        <Button onClick={handleClick}><AddIcon sx={{mr: 0.5}}/> Boodschappenlijst</Button>
        <Menu
            id="add-to-shopping-list-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            PaperProps={{
                style: {
                    maxHeight: 300,
                    width: "25ch",
                },
            }}
        >
            {shoppingLists!.map((shoppingList) => (
                <MenuItem
                    key={shoppingList.id}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        alignItems: "center",
                    }}
                    onClick={() => handleSubmit(shoppingList.id).then(redirectAfterSubmit)}
                >
                    <Avatar sx={{justifySelf: "center"}} key={shoppingList.id}>
                        {shoppingList.title.substring(0, 1).toUpperCase()}
                    </Avatar>

                    <Typography>{shoppingList.title}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </>
}