import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import {Avatar, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useMutation, useQuery} from "react-query";
import {addItemToShoppingList, fetchShoppingListForUser} from "../../services/shoppinglist.service";
import {Item} from "../../models/Item";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoopIcon from '@mui/icons-material/Loop';
import AddRecurringItemModal from "./AddRecurringItemModal";
import {useSnackbar} from "notistack";
import LaunchIcon from '@mui/icons-material/Launch';

export default function AddToShoppingList(props: { item: Item | undefined }) {
    const [recurringItemModalOpen, setRecurringItemModalOpen] = useState(false)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const navigate = useNavigate()
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
        onSuccess
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    if (props.item?.id === undefined) return <></>
    if (isShoppingListsLoading) return <></>;
    if (isShoppingListsError) return <></>;

    function onSuccess() {
        enqueueSnackbar(`${props?.item?.name ?? ''} is toegevoegd aan uw boodschappenlijst`,
            {
                variant: "info",
                action: (<IconButton onClick={() => {
                    navigate("/shopping-lists")
                    closeSnackbar()
                }} sx={{color: "inherit"}}>
                    <LaunchIcon/>
                </IconButton>)
            })
    }

    return <>
        <AddRecurringItemModal open={recurringItemModalOpen} handleClose={() => setRecurringItemModalOpen(false)}
                               item={props.item}/>
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
            <MenuItem
                onClick={() => setRecurringItemModalOpen(true)}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{justifySelf: "center"}}>
                    <LoopIcon/>
                </Avatar>

                <Typography>Periodiek nodig</Typography>
            </MenuItem>
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
        </Menu>
    </>
}
