import {Avatar, Menu, MenuItem} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import React, {useState} from "react";
import LoginButton from "./LoginButton";
import {useNavigate} from "react-router-dom";

export default function ProfileButton() {
    const {user, setTokens} = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    if (user === null) return <LoginButton/>;

    return (
        <>
            <IconButton onClick={openMenu}>
                <AvatarIcon avatar={user?.avatar ?? null}/>
            </IconButton>
            <Menu
                id="basic-menu"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        setTokens(null, null);
                        /*window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;*/
                    }}
                >
                    Logout
                </MenuItem>
                <MenuItem onClick={() => navigate("/settings")}>Instellingen</MenuItem>
            </Menu>
        </>
    );
}

export function AvatarIcon(props: { avatar: string | null }) {
    const sx = {w: 16, h: 16};

    if (props.avatar === null) return <Avatar sx={sx}>??</Avatar>;
    return <Avatar sx={sx} src={props.avatar}/>;
}
