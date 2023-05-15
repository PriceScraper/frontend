import {Button, Dialog, DialogContent, DialogTitle, TextField,} from "@mui/material";
import React from "react";
import {SlideTransition as Transition} from "../transitions/Transitions";
import {useForm} from "react-hook-form";
import {createShoppingListForUser} from "../../../services/shoppinglist.service";
import {useMutation, useQueryClient} from "react-query";

interface AddShoppingListDialogProps {
  handleCloseDialog: () => void;
  dialogIsOpen: boolean;
}

export default function AddShoppingListDialog({
  handleCloseDialog,
  dialogIsOpen,
}: AddShoppingListDialogProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (title: string) => createShoppingListForUser(title),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["shoppingLists"]});
    },
  });
  const {register, handleSubmit} = useForm();
  return (
    <Dialog
      open={dialogIsOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="add-shopping-list-dialog-slide-description"
      fullWidth
      maxWidth="sm"
      sx={{ height: "70%" }}
    >
      <DialogTitle
        sx={{ fontSize: "1.8rem", paddingBottom: "0", paddingX: "3rem" }}
      >
        Voeg een boodschappenlijst toe
      </DialogTitle>
      <DialogContent
        sx={{ paddingX: "3rem" }}
        id="add-shopping-list-dialog-slide-description"
      >
        <form
          onSubmit={() => handleSubmit((data) => mutation.mutate(data.title))}
          style={{
            display: "grid",
            marginTop: "1.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <TextField
            {...register("title")}
            placeholder={"Mijn lijst"}
            label={"Naam"}
          />

          <Button
            sx={{ marginTop: "1rem", paddingY: "1rem" }}
            variant="contained"
            type={"submit"}
            onClick={() => {
              handleCloseDialog();
            }}
          >
            Toevoegen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
