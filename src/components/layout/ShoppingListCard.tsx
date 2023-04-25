import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { findTrackedItemWithLowestPrice } from "../../utils/item.util";
import { ShoppingList } from "../../models/ShoppingList";

interface ShoppingListCardProps {
  listNumber: number;
  shoppingList: ShoppingList;
}

export default function ShoppingListCard({
  listNumber,
  shoppingList,
}: ShoppingListCardProps) {
  return (
    <Card sx={{ display: "flex" }}>
      <CardActionArea>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 3fr",
            padding: "0.6rem",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ lineHeight: "3rem", fontSize: "3rem" }}
              component="div"
              variant="h2"
            >
              #{listNumber}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: "0",
              paddingTop: "0",
              paddingLeft: "1rem",
              display: "grid",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                padding: "0",
                fontFamily: "'Cookie', cursive",
                fontSize: "2.1rem",
              }}
              component="div"
              variant="h5"
            >
              {shoppingList.title}
            </Typography>
            <Typography
              sx={{
                padding: "0",
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: "1.4rem",
              }}
              component="div"
              variant="h6"
            >
              €
              {shoppingList.items
                .reduce(
                  (prev, current) =>
                    prev + findTrackedItemWithLowestPrice(current.trackedItems),
                  0.0
                )
                .toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{ paddingBottom: "0", paddingTop: "0", paddingLeft: "1rem" }}
          >
            <ul
              style={{
                margin: "0",
                color: "#383838",
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: "1.1rem",
                lineHeight: "1.15rem",
              }}
            >
              {shoppingList.items.length > 3
                ? shoppingList.items
                    .slice(0, 2)
                    .map((item) => <li key={item.id}>{item.name}</li>)
                    .concat(<li key={"more"}>...</li>)
                : shoppingList.items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
            </ul>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
