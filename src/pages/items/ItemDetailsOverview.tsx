import "../../style/MainContainer.scss";
import "../../style/ProductDetailsOverview.scss";
import {fetchItem} from "../../services/item.service";
import MainContainer from "../../components/layout/MainContainer";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import PriceBar from "../../components/layout/PriceBar";
import {getShopDominantColorByName, getShopLogoUrlByName,} from "../../utils/shop.util";
import useSettings from "../../hooks/useSettings";
import {getWhiteListedTrackedItemsForItem, orderedPrices} from "../../utils/item.util";
import {getLatestPriceFromTrackedItems} from "../../models/Item";
import HistoryChart from "../../components/item/HistoryChart";
import Divider from "@mui/material/Divider";
import AddToShoppingList from "../../components/item/AddToShoppingList";
import useAuth from "../../hooks/useAuth";

export default function ItemDetailsOverview() {
    const {isAuthenticated} = useAuth()
    const {whiteListedShops} = useSettings();
    const {itemId} = useParams<string>();

    const {isLoading, isError, data} = useQuery(
        ["item", itemId],
        () => fetchItem(parseInt(itemId!!)),
        {
            enabled: !!itemId,
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error...</div>;

    console.log(whiteListedShops)
    console.log(getWhiteListedTrackedItemsForItem(data, whiteListedShops))

    const averagePrice =
        getLatestPriceFromTrackedItems(data).trackedItems.length !== 0
            ? data.trackedItems.reduce((p, c) => p + c.itemPrices[0].price, 0) /
            data.trackedItems.length
            : 0;
    return (
        <MainContainer backTrackableTo={"/"}>
            <div className={"product-details"}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr",
                        alignItems: "center",
                    }}
                >
                    <h1>{data?.name}</h1>
                    {isAuthenticated && <AddToShoppingList item={data}/>}
                </div>
                <div className={"product-details-hero-section"}>
                    <img
                        alt={"product"}
                        className={"product-details-img"}
                        src={data?.image}
                        width={250}
                    />
                    <div className={"product-details-comparison"}>
                        {getWhiteListedTrackedItemsForItem(data, whiteListedShops)
                            .map(
                                (trackedItem) => (
                                    <PriceBar
                                        key={trackedItem.url}
                                        logoUrl={getShopLogoUrlByName(trackedItem.shop.name)!}
                                        price={orderedPrices(trackedItem.itemPrices).reverse()[0].price}
                                        percentageFilled={
                                            orderedPrices(trackedItem.itemPrices).reverse()[0].price / averagePrice + 1 > 100
                                                ? 100
                                                : orderedPrices(trackedItem.itemPrices).reverse()[0].price / averagePrice + 1
                                        }
                                    color={getShopDominantColorByName(trackedItem.shop.name)!}
                                />
                            )
                        )}
                    </div>
                </div>
                <Divider sx={{visibility: "hidden", my: 10}}/>
                <HistoryChart trackedItems={data.trackedItems}/>
            </div>
        </MainContainer>
    );
}
