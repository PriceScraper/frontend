import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Error404 from "../pages/errors/Error404";
import ItemDetailsOverview from "../pages/items/ItemDetailsOverview";
import ShoppingListsOverview from "../pages/shop/ShoppingListsOverview";

export default function MainRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={"/product/:itemId"} element={<ItemDetailsOverview />} />
      <Route path={"/shopping-lists"} element={<ShoppingListsOverview />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"*"} element={<Error404 />} />
    </Routes>
  );
}
