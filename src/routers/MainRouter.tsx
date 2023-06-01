import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Error404 from "../pages/errors/Error404";
import ItemDetailsOverview from "../pages/items/ItemDetailsOverview";
import ShoppingListsOverview from "../pages/shop/ShoppingListsOverview";
import ItemSearch from "../pages/items/ItemSearch";
import SettingsPage from "../pages/settings/SettingsPage";
import {SettingsProvider} from "../hooks/useSettings";
import RecipeRouter from "./RecipeRouter";
import ScanItem from "../pages/items/ScanItem";
import Logout from "../pages/Logout";

export default function MainRouter() {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path={"/item/scan"} element={<ScanItem/>}/>
            <Route
                path={"/item/:itemId"}
                element={
                    <SettingsProvider>
                        <ItemDetailsOverview/>
                    </SettingsProvider>
                }
            />
            <Route
                path={"/shopping-lists"}
                element={
                    <SettingsProvider>
                        <ShoppingListsOverview/>
                    </SettingsProvider>
                }
            />
            <Route path={"/items/search"} element={<ItemSearch/>}/>
            <Route
                path={"/settings"}
                element={
                    <SettingsProvider>
                        <SettingsPage/>
                    </SettingsProvider>
                }
            />
            <Route path={"/recipes/*"} element={<RecipeRouter/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/auth/:refreshToken/:accessToken"} element={<Login/>}/>
            <Route path={"/logout"} element={<Logout/>}/>
            <Route path={"*"} element={<Error404/>}/>
        </Routes>
    );
}
