import { Box, Card, CardActionArea } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AddShoppingListCard() {
  return (
    <Card
      sx={{
        display: "flex",
        border: "2px solid #595959",
        borderStyle: "dashed",
        boxShadow: "none",
        backgroundColor: "#bde0fe",
      }}
    >
      <CardActionArea>
        <Box
          sx={{ padding: "1.8rem", display: "grid", justifyItems: "center" }}
        >
          <AddCircleIcon fontSize={"large"} />
        </Box>
      </CardActionArea>
    </Card>
  );
}
