import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { Item } from "../../models/Item";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ShoppingListDialogProps {
  title: string;
  items: Item[];
  handleCloseDialog: () => void;
  dialogIsOpen: boolean;
}

export default function ShoppingListDialog({
  title,
  items,
  handleCloseDialog,
  dialogIsOpen,
}: ShoppingListDialogProps) {
  return (
    <Dialog
      open={dialogIsOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="shopping-list-dialog-slide-description"
      fullWidth
      maxWidth="sm"
      sx={{ height: "70%" }}
    >
      <DialogTitle sx={{ fontSize: "2rem", paddingBottom: "0" }}>
        {title}
      </DialogTitle>
      <DialogContent id="shopping-list-dialog-slide-description">
        <ul className={"shopping-list-dialog-products"}>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
