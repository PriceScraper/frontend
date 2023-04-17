import {useState} from "react";
import {TopBar} from "./TopNav/Topbar";
import LeftNav from "./LeftNav/LeftNav";

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return <>
        <TopBar open={open} toggleDrawer={toggleDrawer} />
        <LeftNav open={open} toggleDrawer={toggleDrawer} setOpen={setOpen} />
    </>
}
