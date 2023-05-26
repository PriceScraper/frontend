import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import * as React from "react";
import Typography from "@mui/material/Typography";
import LeftNavItem, {LeftNavItemExternalUrl} from "./LeftNavItem";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import LoginIcon from '@mui/icons-material/Login';
import useAuth from "../../../hooks/useAuth";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CropFreeIcon from '@mui/icons-material/CropFree';

export default function LeftNav({open, toggleDrawer, setOpen}: {
    open: boolean,
    toggleDrawer: () => void,
    setOpen: (e: boolean) => void
}) {
    const {isAuthenticated} = useAuth()

    function handleMouseAction(isEntering: boolean) {
        if (window.innerWidth > 1000) {
            if (isEntering) setOpen(true)
            else setOpen(false)
        }
    }

    return <Drawer variant="permanent" onMouseEnter={() => handleMouseAction(true)}
                   onMouseLeave={() => handleMouseAction(false)} open={open}>
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
        >
            <Typography onClick={toggleDrawer} fontWeight={"bold"} color={"text.primary"} align={"center"} fontSize={18}
                        sx={{width: "100%"}}>
                Menu
            </Typography>
            <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon/>
            </IconButton>
        </Toolbar>
        <Divider/>
        <List component="nav">
            <LeftNavItem path="/" text="Start" icon={<HomeIcon/>} allowAnonymous={true}/>
            <LeftNavItem path="/Shopping-Lists" text="Boodschappenlijst" icon={<LocalGroceryStoreIcon/>}
                         allowAnonymous={false}/>
            <LeftNavItem path="/Recipes" text="Recepten" icon={<MenuBookIcon/>} allowAnonymous={false}/>
            <LeftNavItem path="/product/Scan" text="Scan product" icon={<CropFreeIcon/>} allowAnonymous={true}/>
            {!isAuthenticated && <>
                <Divider sx={{my: 1}}/>
                <LeftNavItemExternalUrl url={`${process.env.REACT_APP_BACKEND_URL}`} text="Login" icon={<LoginIcon/>}/>
            </>}
        </List>
    </Drawer>
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
