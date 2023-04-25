import "../../style/ShoppingListOverview.scss";
import MainContainer from "../../components/layout/MainContainer";
import ShoppingListCard from "../../components/layout/ShoppingListCard";
import React from "react";
import ShoppingListDialog from "../../components/layout/ShoppingListDialog";
import { useQuery } from "react-query";
import { fetchShoppingListForUser } from "../../services/shoppinglist.service";

export default function ShoppingListsOverview() {
  const [dialogIsOpen, setIsDialogOpen] = React.useState(false);

  const { isLoading, isError, data } = useQuery(["shoppingList"], () =>
    fetchShoppingListForUser()
  );

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error...</div>;

  return (
    <MainContainer
      showHeader={false}
      backTrackableTo={"/"}
      headerMsg={"Uw boodschappenlijsten"}
    >
      <div className={"shopping-lists-overview"}>
        <div onClick={() => handleClickOpen()} className={"shopping-list"}>
          <ShoppingListCard listNumber={1} shoppingList={data} />
        </div>
        <ShoppingListDialog
          title={data.title}
          items={data.items}
          handleCloseDialog={() => handleClose()}
          dialogIsOpen={dialogIsOpen}
        />
      </div>
    </MainContainer>
  );
}
