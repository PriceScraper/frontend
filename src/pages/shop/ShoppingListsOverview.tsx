import "../../style/ShoppingListOverview.scss";
import MainContainer from "../../components/layout/MainContainer";
import ShoppingListCard from "../../components/layout/shoppinglists/ShoppingListCard";
import React from "react";
import ShoppingListDialog from "../../components/layout/shoppinglists/ShoppingListDialog";
import { useQuery } from "react-query";
import { fetchShoppingListForUser } from "../../services/shoppinglist.service";
import AddShoppingListCard from "../../components/layout/shoppinglists/AddShoppingListCard";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import AddShoppingListDialog from "../../components/layout/shoppinglists/AddShoppingListDialog";
import EmptyHint from "../../components/layout/EmptyHint";

interface ShoppingListsDialogsOpen {
  [key: number]: boolean;
}
export default function ShoppingListsOverview() {
  const [shoppingListDialogIsOpen, setIsShoppingListDialogOpen] =
    React.useState<ShoppingListsDialogsOpen>({});
  const [addShoppingListDialogIsOpen, setIsAddShoppingListDialogOpen] =
    React.useState(false);

  const { isLoading, isError, data } = useQuery(["shoppingLists"], () =>
    fetchShoppingListForUser()
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error...</div>;

  return (
    <MainContainer
      showHeader={false}
      backTrackableTo={"/"}
      headerMsg={"Uw boodschappenlijsten"}
    >
      <div className={"shopping-lists-overview"}>
        {data.map((shoppingList, index) => (
          <div key={shoppingList.id} style={{ marginTop: "1rem" }}>
            <div
              onClick={() =>
                setIsShoppingListDialogOpen((prevState) => ({
                  ...prevState,
                  [shoppingList.id]: true,
                }))
              }
              className={"shopping-list"}
            >
              <ShoppingListCard
                listNumber={index + 1}
                shoppingList={shoppingList}
              />
            </div>
            <ShoppingListDialog
              id={shoppingList.id}
              title={shoppingList.title}
              lines={shoppingList.lines}
              handleCloseDialog={() =>
                setIsShoppingListDialogOpen((prevState) => ({
                  ...prevState,
                  [shoppingList.id]: false,
                }))
              }
              dialogIsOpen={
                shoppingListDialogIsOpen[shoppingList.id] !== undefined
                  ? shoppingListDialogIsOpen[shoppingList.id]
                  : false
              }
            />
          </div>
        ))}
        {data.length === 0 ? (
          <div style={{ marginTop: "4rem" }}>
            <EmptyShoppingListAlert
              handleClick={() => setIsAddShoppingListDialogOpen(true)}
            />
          </div>
        ) : (
          <div
            onClick={() => setIsAddShoppingListDialogOpen(true)}
            style={{ marginTop: "1rem", zIndex: 100 }}
          >
            <AddShoppingListCard />
          </div>
        )}
        <AddShoppingListDialog
          handleCloseDialog={() => setIsAddShoppingListDialogOpen(false)}
          dialogIsOpen={addShoppingListDialogIsOpen}
        />
      </div>
    </MainContainer>
  );
}
interface EmptyShoppingListAlertProps {
  handleClick: () => void;
}
function EmptyShoppingListAlert({ handleClick }: EmptyShoppingListAlertProps) {
  return (
    <EmptyHint
      icon={<RemoveShoppingCartIcon />}
      description={
        <Typography>
          U heeft nog geen boodschappenlijsten,{" "}
          <span onClick={handleClick}>voeg er één toe</span>.
        </Typography>
      }
    />
  );
}
