import "../../style/MainContainer.scss";
import "../../style/ProductDetailsOverview.scss";
import { fetchItem } from "../../services/item.service";
import MainContainer from "../../components/layout/MainContainer";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import PriceBar from "../../components/layout/PriceBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Avatar, Menu, MenuItem, Snackbar } from "@mui/material";
import {
  addItemToShoppingList,
  fetchShoppingListForUser,
} from "../../services/shoppinglist.service";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SlideTransition } from "../../components/layout/transitions/Transitions";
import {
  getShopDominantColorByName,
  getShopLogoUrlByName,
} from "../../utils/shop.util";
import useSettings from "../../hooks/useSettings";
import { getWhiteListedTrackedItemsForItem } from "../../utils/item.util";

export default function ItemDetailsOverview() {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { whiteListedShops } = useSettings();

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { itemId } = useParams<string>();

  const { isLoading, isError, data } = useQuery(
    ["item", itemId],
    () => fetchItem(parseInt(itemId!!)),
    {
      enabled: !!itemId,
    }
  );

  const mutation = useMutation({
    mutationFn: (data: {
      shoppingListId: number;
      itemId: number;
      quantity: number;
    }) =>
      addItemToShoppingList(data.shoppingListId, data.itemId, data.quantity),
    onSuccess: () => {
      setSnackBarOpen(true);
    },
  });

  const {
    isLoading: isShoppingListsLoading,
    isError: isShoppingListsError,
    data: shoppingLists,
  } = useQuery(["shoppingLists"], () => fetchShoppingListForUser());

  if (isLoading || isShoppingListsLoading) return <div>Loading...</div>;
  if (isError || isShoppingListsError || !data) return <div>Error...</div>;

  const averagePrice =
    data.trackedItems.length !== 0
      ? data.trackedItems.reduce((p, c) => p + c.itemPrices[0].price, 0) /
        data.trackedItems.length
      : 0;
  return (
    <MainContainer backTrackableTo={"/"}>
      <div className={"product-details"}>
        <div className={"product-details-hero-section"}>
          <img
            alt={"product"}
            className={"product-details-img"}
            src={data?.image}
          />
          <div className={"product-details-comparison"}>
            {getWhiteListedTrackedItemsForItem(data, whiteListedShops).map(
              (trackedItem) => (
                <PriceBar
                  key={trackedItem.url}
                  logoUrl={getShopLogoUrlByName(trackedItem.shop.name)!}
                  price={trackedItem.itemPrices[0].price}
                  percentageFilled={
                    trackedItem.itemPrices[0].price / averagePrice + 1 > 100
                      ? 100
                      : trackedItem.itemPrices[0].price / averagePrice + 1
                  }
                  color={getShopDominantColorByName(trackedItem.shop.name)!}
                />
              )
            )}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            alignItems: "center",
          }}
        >
          <h1>{data?.name}</h1>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ width: "3rem", height: "3rem", justifySelf: "end" }}
          >
            <AddShoppingCartIcon />
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
                    itemId: data?.id,
                    quantity: 1,
                  });
                }}
              >
                <Avatar sx={{ justifySelf: "center" }} key={shoppingList.id}>
                  {shoppingList.title.substring(0, 1).toUpperCase()}
                </Avatar>

                <Typography>{shoppingList.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <Snackbar
        sx={{ fontSize: "1.1rem" }}
        open={snackBarOpen}
        TransitionComponent={SlideTransition}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={
          <p>
            {data.name} is toegevoegd aan{" "}
            <Link style={{ color: "#FFF" }} to={"/shopping-lists"}>
              uw boodschappenlijst
            </Link>{" "}
          </p>
        }
      />
    </MainContainer>
  );
}
