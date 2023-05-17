import {TrackedItem} from "../../models/TrackedItem";
import {ItemPrice} from "../../models/ItemPrice";
import {VictoryChart, VictoryLegend, VictoryLine, VictoryTheme} from "victory";
import {getShopDominantColorByName} from "../../utils/shop.util";
import {Typography} from "@mui/material";

export default function HistoryChart(props: { trackedItems: TrackedItem[] }) {
    if (props.trackedItems.filter(ti => ti.itemPrices.length > 1).length === 0) return <></>
    return <>
        <Typography variant={"h6"} sx={{ml: "42px"}}>
            Historiek
        </Typography>
        <VictoryChart
            width={800}
            height={400}
            theme={VictoryTheme.material}
        >
            <VictoryLegend x={50}
                           orientation="horizontal"
                           gutter={20}
                           style={{border: {stroke: "black"}, title: {fontSize: 20}}}
                           data={props.trackedItems.map(ti => {
                               return {
                                   name: ti.shop.name,
                                   symbol: {fill: getShopDominantColorByName(ti.shop.name)}
                               }
                           })}
            />
            {props.trackedItems.map(trackedItem =>
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
                    data={orderedPrices(trackedItem.itemPrices).map(e => {
                        return {x: e.timestamp.substring(0, 10), y: e.price}
                    })}
                    interpolation={"basis"}
                />)
            }
        </VictoryChart>
    </>
}

function orderedPrices(prices: ItemPrice[]) {
    return prices
        .sort((a, b) => {
            if (new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime()) return 1
            if (new Date(a.timestamp).getTime() < new Date(b.timestamp).getTime()) return -1
            return 0
        })
}
