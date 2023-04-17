import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Error404 from "../pages/errors/Error404";


export default function MainRouter() {
    return <Routes>
        <Route index element={<Home/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"*"} element={<Error404/>}/>
    </Routes>
}