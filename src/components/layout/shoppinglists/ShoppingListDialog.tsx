import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { SlideTransition as Transition } from "../dialogs/Transitions";
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
import { findTrackedItemWithLowestPrice } from "../../../utils/item.util";
import { getShopLogoUrlByName } from "../../../utils/shop.util";
import { getTotalByLines } from "../../../utils/shoppinglist.util";

interface ShoppingListDialogProps {
  id: number;
  title: string;
  lines: ShoppingListLine[];
  handleCloseDialog: () => void;
  dialogIsOpen: boolean;
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
}: ShoppingListDialogProps) {
  const queryClient = useQueryClient();
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

  const [shoppingListDialogIsOpen, setIsShoppingListDialogOpen] =
    React.useState(false);
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
                  gridTemplateColumns: "2fr 1fr 1fr",
                  fontSize: "1.1rem",
                }}
                key={line.item.id}
              >
                <div>
                  {line.item.name} x {line.quantity}{" "}
                </div>
                <ItemActions
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
                    line.item.trackedItems.length > 0 &&
                    "€" +
                      (
                        findTrackedItemWithLowestPrice(line.item.trackedItems)
                          .itemPrices[0].price * line.quantity
                      ).toFixed(2)}
                  <img
                    src={getShopLogoUrlByName(
                      findTrackedItemWithLowestPrice(line.item.trackedItems)
                        .shop.name
                    )}
                    alt={"shop logo"}
                    style={{ height: "2rem", width: "2rem" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        <div>
          <Typography
            variant={"h2"}
            sx={{
              fontFamily: "'Source Sans Pro',sans-serif;",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            €{getTotalByLines(lines)}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ItemActionsProps {
  addQuantity: () => void;
  reduceQuantity: () => void;
}

function ItemActions({ addQuantity, reduceQuantity }: ItemActionsProps) {
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
