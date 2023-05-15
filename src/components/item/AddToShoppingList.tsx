import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import {Avatar, Menu, MenuItem, Snackbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useMutation, useQuery} from "react-query";
import {addItemToShoppingList, fetchShoppingListForUser} from "../../services/shoppinglist.service";
import {Item} from "../../models/Item";
import {useState} from "react";
import {SlideTransition} from "../layout/transitions/Transitions";
import {Link} from "react-router-dom";

export default function AddToShoppingList(props: { item: Item | undefined }) {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const {
        isLoading: isShoppingListsLoading,
        isError: isShoppingListsError,
        data: shoppingLists,
    } = useQuery(["shoppingLists"], () => fetchShoppingListForUser());
    const mutation = useMutation({
        mutationFn: (data: {
            shoppingListId: number;
            itemId: number;
            quantity: number;
        }) =>
            addItemToShoppingList(data.shoppingListId, data.itemId, data.quantity),
        onSuccess: () => {
            setSnackBarOpen(true);
        },
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleSnackBarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackBarOpen(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    if (props.item?.id === undefined) return <></>
    if (isShoppingListsLoading) return <></>;
    if (isShoppingListsError) return <></>;

    return <>
        <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{width: "3rem", height: "3rem", justifySelf: "end"}}
        >
            <AddShoppingCartIcon/>
        </IconButton>
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
                    onClick={() => {
                        handleClose();
                        mutation.mutate({
                            shoppingListId: shoppingList.id,
                            itemId: props.item?.id ?? -1,
                            quantity: 1,
                        });
                    }}
                >
                    <Avatar sx={{justifySelf: "center"}} key={shoppingList.id}>
                        {shoppingList.title.substring(0, 1).toUpperCase()}
                    </Avatar>

                    <Typography>{shoppingList.title}</Typography>
                </MenuItem>
            ))}
            <Snackbar
                sx={{fontSize: "1.1rem"}}
                open={snackBarOpen}
                TransitionComponent={SlideTransition}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                message={
                    <p>
                        {props.item.name} is toegevoegd aan{" "}
                        <Link style={{color: "#FFF"}} to={"/shopping-lists"}>
                            uw boodschappenlijst
                        </Link>{" "}
                    </p>
                }
            />
        </Menu>
    </>
}