import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Error404 from "../pages/errors/Error404";

import ItemDetailsOverview from "../pages/items/ItemDetailsOverview";
import ShoppingListsOverview from "../pages/shop/ShoppingListsOverview";
import Login from "../pages/auth/Login";

export default function MainRouter() {
    return <Routes>
        <Route index element={<Home/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/product/:itemId"} element={<ItemDetailsOverview />} />
        <Route path={"/shopping-lists"} element={<ShoppingListsOverview />} />
        <Route path={"/auth/:token"} element={<Login/>}/>
        <Route path={"*"} element={<Error404/>}/>
    </Routes>
}
