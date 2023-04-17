import {useNavigate} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export default function LeftNavItem(details : {path : string, icon:JSX.Element, text:string}) {
    const navigate = useNavigate()
    return <ListItemButton onClick={() => navigate(details.path)}>
        <ListItemIcon>
            {details.icon}
        </ListItemIcon>
        <ListItemText primary={details.text} />
    </ListItemButton>
}
