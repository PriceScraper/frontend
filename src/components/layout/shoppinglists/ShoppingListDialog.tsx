import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useMemo, useState } from "react";
import { SlideTransition as Transition } from "../transitions/Transitions";
import { ShoppingListLine } from "../../../models/ShoppingListLine";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "react-query";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import {
  addItemToShoppingList,
  deleteItemFromShoppingList,
  deleteShoppingListForUser,
} from "../../../services/shoppinglist.service";
import EmptyHint from "../EmptyHint";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  findTrackedItemWithLowestPrice,
  getWhiteListedTrackedItemsForItem,
} from "../../../utils/item.util";
import { getShopLogoUrlByName } from "../../../utils/shop.util";
import { getTotalByLines } from "../../../utils/shoppinglist.util";
import ShoppingListItemCheckBox, {
  anyCheckedInShoppingList,
  uncheckAllFromShoppingList,
} from "./ShoppingListItemCheckBox";
import PrintShoppingListButton from "./PrintShoppingList";
import useInterval from "../../../hooks/useInterval";

interface ShoppingListDialogProps {
  id: number;
  title: string;
  lines: ShoppingListLine[];
  handleCloseDialog: () => void;
  dialogIsOpen: boolean;
  whiteListedShops: string[];
}

interface ShoppingListItemAction {
  shoppingListId: number;
  itemId: number;
  quantity: number;
}

export default function ShoppingListDialog({
  id,
  title,
  lines,
  handleCloseDialog,
  dialogIsOpen,
  whiteListedShops,
}: ShoppingListDialogProps) {
  const queryClient = useQueryClient();
  const total = useMemo(
    () => getTotalByLines(lines, whiteListedShops),
    [lines, whiteListedShops]
  );
  const [anyChecked, setAnyChecked] = useState(false);
  const [requireRefresh, setRequireRefresh] = useState(false);
  useInterval(getAnyCheckedVal, 0.5);

  const mutation = useMutation({
    mutationFn: (id: number) => deleteShoppingListForUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });
  const addItemMutation = useMutation({
    mutationFn: (data: ShoppingListItemAction) =>
      addItemToShoppingList(data.shoppingListId, data.itemId, data.quantity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (data: ShoppingListItemAction) =>
      deleteItemFromShoppingList(
        data.shoppingListId,
        data.itemId,
        data.quantity
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });

  function unselectAll() {
    uncheckAllFromShoppingList(id);
    setRequireRefresh(!requireRefresh);
  }

  function getAnyCheckedVal() {
    setAnyChecked(anyCheckedInShoppingList(id));
  }

  return (
    <Dialog
      open={dialogIsOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby={"shopping-list-dialog-slide-description-" + id}
      fullWidth
      maxWidth="sm"
      sx={{ height: "70%" }}
    >
      <DialogTitle
        sx={{
          fontSize: "2rem",
          paddingBottom: "0.5rem",
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          backgroundColor: "#bbdefb",
        }}
      >
        <div>{title}</div>
        <div style={{ display: "grid", justifyItems: "end" }}>
          <div className={"flexElements"}>
            <PrintShoppingListButton lines={lines} title={title} />
            <IconButton
              onClick={() => {
                mutation.mutate(id);
                handleCloseDialog();
              }}
              sx={{
                height: "3rem",
                width: "3rem",
                color: "rgba(0, 0, 0, 0.87)",
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent id={"shopping-list-dialog-slide-description-" + id}>
        {lines === null || lines.length === 0 ? (
          <div style={{ marginTop: "2.5rem" }}>
            <EmptyHint
              icon={<AutoAwesomeMosaicIcon />}
              description={
                <Typography>
                  Hier komen je boodschappen nadat je ze{" "}
                  <Link to={"/"}>
                    <span>toevoegt</span>
                  </Link>
                  .
                </Typography>
              }
            />
          </div>
        ) : (
          <ul className={"shopping-list-dialog-products"}>
            {lines.map((line) => (
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  fontSize: "1.1rem",
                }}
                key={line.item.id}
              >
                <div>
                  <ShoppingListItemCheckBox
                    listId={id}
                    itemId={line.item.id}
                    value={requireRefresh}
                  />
                </div>
                <div>{line.item.name} </div>
                <ItemActions
                  quantity={line.quantity}
                  addQuantity={() =>
                    addItemMutation.mutate({
                      shoppingListId: id,
                      itemId: line.item.id,
                      quantity: 1,
                    })
                  }
                  reduceQuantity={() =>
                    deleteItemMutation.mutate({
                      shoppingListId: id,
                      itemId: line.item.id,
                      quantity: 1,
                    })
                  }
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "center",
                  }}
                >
                  {line.item.trackedItems !== null &&
                  getWhiteListedTrackedItemsForItem(line.item, whiteListedShops)
                    .length > 0 ? (
                    <>
                      €
                      {(
                        findTrackedItemWithLowestPrice(
                          getWhiteListedTrackedItemsForItem(
                            line.item,
                            whiteListedShops
                          )
                        ).itemPrices[0].price * line.quantity
                      ).toFixed(2)}
                      <img
                        src={getShopLogoUrlByName(
                          findTrackedItemWithLowestPrice(
                            getWhiteListedTrackedItemsForItem(
                              line.item,
                              whiteListedShops
                            )
                          ).shop.name
                        )}
                        alt={"shop logo"}
                        style={{ maxHeight: "2rem", maxWidth: "2rem" }}
                      />
                    </>
                  ) : (
                    <span style={{ gridColumn: "span 2" }}>
                      Geen prijs gevonden
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={"flexElements spaceBetweenElements"}>
          <Typography
            variant={"h2"}
            sx={{
              fontFamily: "'Source Sans Pro',sans-serif;",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            €{total}
          </Typography>
          <Button
            color={"primary"}
            onClick={unselectAll}
            disabled={!anyChecked}
          >
            Deselecteer alles
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ItemActionsProps {
  addQuantity: () => void;
  reduceQuantity: () => void;
  quantity: number;
}

function ItemActions({
  addQuantity,
  reduceQuantity,
  quantity,
}: ItemActionsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "flex-start",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ width: "2rem", height: "2rem" }}
        onClick={reduceQuantity}
        color={"primary"}
      >
        <RemoveIcon />
      </IconButton>
      {quantity}
      <IconButton
        sx={{ width: "2rem", height: "2rem" }}
        onClick={addQuantity}
        color={"primary"}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
