import {Box, Card, CardActionArea, Typography} from "@mui/material";
import {ShoppingList} from "../../../models/ShoppingList";
import {getTotalByLines} from "../../../utils/shoppinglist.util";
import {useMemo} from "react";
import {shortenNameIfTooLong} from "../../../utils/item.util";

interface ShoppingListCardProps {
    listNumber: number;
    shoppingList: ShoppingList;
    whiteListedShops: string[];
}

export default function ShoppingListCard({
                                             listNumber,
                                             shoppingList,
                                             whiteListedShops,
                                         }: ShoppingListCardProps) {
    const total = useMemo(
        () => getTotalByLines(shoppingList.lines, whiteListedShops),
        [shoppingList.lines, whiteListedShops]
    );
    return (
        <Card sx={{display: "flex", border: "1px solid black"}}>
            <CardActionArea>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 1fr",
                        boxSizing: "border-box",
                        justifyItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            backgroundColor: "#bbdefb",
                        }}
                    >
                        <Typography
                            sx={{lineHeight: "3rem", fontSize: "3rem"}}
                            component="div"
                            variant="h2"
                        >
                            #{listNumber}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            padding: "1rem",
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
                            €{total}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            paddingBottom: "1rem",
                            paddingTop: "1rem",
                        }}
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
                            {shoppingList.lines !== null &&
                                (shoppingList.lines.length > 3
                                    ? shoppingList.lines
                                        .slice(0, 2)
                                        .map((line) => (
                                            <li key={line.item.id}>{line.item.name}</li>
                                        ))
                                        .concat(<li key={"more"}>...</li>)
                                    : shoppingList.lines.map((line) => (
                                        <li key={line.id}>{shortenNameIfTooLong(line.item.name)}</li>
                                    )))}
                        </ul>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}
