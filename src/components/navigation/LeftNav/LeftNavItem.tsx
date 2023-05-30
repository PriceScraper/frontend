import {useNavigate} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import useAuth from "../../../hooks/useAuth";

export default function LeftNavItem(details: {
    path: string,
    icon: JSX.Element,
    text: string,
    allowAnonymous: boolean
}) {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    if (!details.allowAnonymous && !isAuthenticated) return <></>

    return <ListItemButton onClick={() => navigate(details.path)}>
        <ListItemIcon>
            {details.icon}
        </ListItemIcon>
        <ListItemText primary={details.text}/>
    </ListItemButton>
}

export function LeftNavItemExternalUrl(details: { url: string, icon: JSX.Element, text: string }) {
    return <ListItemButton onClick={() => window.location.href = details.url}>
        <ListItemIcon>
            {details.icon}
        </ListItemIcon>
        <ListItemText primary={details.text}/>
    </ListItemButton>
}
