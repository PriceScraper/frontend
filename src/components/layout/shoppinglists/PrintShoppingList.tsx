import Grid from "@mui/material/Grid";
import {IconButton, Typography} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PrintIcon from '@mui/icons-material/Print';
import {ShoppingListLine} from "../../../models/ShoppingListLine";
import {getShopLogoUrlByName} from "../../../utils/shop.util";
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";

export default function PrintShoppingListButton({lines, title}: { title: string, lines: ShoppingListLine[] }) {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return <>
        <IconButton disabled={lines.length === 0} sx={{color: "rgba(0, 0, 0, 0.87)"}} onClick={handlePrint}>
            <PrintIcon/>
        </IconButton>
        <div style={{display: "none"}}>
            <div ref={componentRef}>
                <PrintShoppingListLayout lines={lines} title={title}/>
            </div>
        </div>
    </>
}

export function PrintShoppingListLayout(props: { title: string, lines: ShoppingListLine[] }) {
    let counter = 0
    return <div style={{margin: 30}}>
        <Typography variant={"subtitle2"}>Boodschappenlijst: {props.title}</Typography>
        {props.lines
            .map(line => <Grid key={counter++} container px={1} sx={{my: 1}}>
                <Grid item sm={1} sx={{my: "auto"}}>
                    <CheckBoxOutlineBlankIcon/>
                </Grid>
                <Grid item sm={1} sx={{my: "auto"}}>
                    <Typography>x{line.quantity}</Typography>
                </Grid>
                <Grid item sm={1}>
                    <img src={line.item.image} alt={line.item.name} style={{maxHeight: 40, maxWidth: 40}}/>
                </Grid>
                <Grid item sm={9}>
                    <span>{line.item.name}</span>
                    <div className={"flexElements"}>
                        {line.item.trackedItems
                            .sort((a, b) => a.itemPrices[0].price - b.itemPrices[0].price)
                            .map(ti => <div key={counter++}>
                                <img src={getShopLogoUrlByName(ti.shop.name)} height={"10px"} alt={ti.shop.name}/>
                                <span style={{marginLeft: 5, marginRight: 20}}>€{ti.itemPrices[0].price}</span>
                            </div>)}
                    </div>
                </Grid>
            </Grid>)}
    </div>
}
