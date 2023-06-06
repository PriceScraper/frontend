import {TrackedItem} from "../../models/TrackedItem";
import {VictoryChart, VictoryLegend, VictoryLine, VictoryTheme} from "victory";
import {getShopDominantColorByName} from "../../utils/shop.util";
import {Typography} from "@mui/material";
import {onePricePerDay, orderedPrices} from "../../utils/item.util";
import {max, min} from "../../utils/number.util";

export default function HistoryChart(props: { trackedItems: TrackedItem[] }) {
    if (props.trackedItems.filter(e => onePricePerDay(e.itemPrices).length > 1).length === 0) return <></>

    return <>
        <Typography variant={"h6"} sx={{ml: "42px"}}>
            Historiek
        </Typography>
        <VictoryChart
            width={800}
            height={400}
            theme={VictoryTheme.material}
            maxDomain={{y: max(props.trackedItems.map(e => max(e.itemPrices.map(b => b.price)))) * 1.1}}
            minDomain={{y: min(props.trackedItems.map(e => min(e.itemPrices.map(b => b.price)))) * 0.9}}
        >
            <VictoryLegend x={50}
                           orientation="horizontal"
                           gutter={20}
                           style={{border: {stroke: "black"}, title: {fontSize: 20}}}
                           data={props.trackedItems.filter(e => e.itemPrices.length > 1).map(ti => {
                               return {
                                   name: ti.shop.name,
                                   symbol: {fill: getShopDominantColorByName(ti.shop.name)}
                               }
                           })}
            />
            {props.trackedItems.filter(e => e.itemPrices.length > 1).map(trackedItem =>
                <VictoryLine
                    key={trackedItem.url}
                    style={{
                        data: {
                            stroke: getShopDominantColorByName(trackedItem.shop.name),
                            strokeWidth: 2,
                            borderRadius: 0,
                            width: "200px",
                            strokeLinecap: "round"
                        },
                    }}
                    data={orderedPrices(onePricePerDay(trackedItem.itemPrices)).map(e => {
                        return {x: e.timestamp.substring(0, 10), y: e.price}
                    })}
                    interpolation={"basis"}
                />)
            }
        </VictoryChart>
    </>
}
