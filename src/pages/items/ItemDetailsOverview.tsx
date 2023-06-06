import "../../style/MainContainer.scss";
import "../../style/ProductDetailsOverview.scss";
import {fetchItem} from "../../services/item.service";
import MainContainer from "../../components/layout/MainContainer";
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery} from "react-query";
import PriceBar from "../../components/layout/PriceBar";
import {getShopDominantColorByName, getShopLogoUrlByName,} from "../../utils/shop.util";
import useSettings from "../../hooks/useSettings";
import {
    getWhiteListedTrackedItemsForItem,
    limitShops,
    orderedPrices,
    pricePercentageOnMax,
    sortTrackedItemOnPriceAsc,
} from "../../utils/item.util";
import HistoryChart from "../../components/item/HistoryChart";
import Divider from "@mui/material/Divider";
import AddToShoppingList from "../../components/item/AddToShoppingList";
import useAuth from "../../hooks/useAuth";
import {Typography} from "@mui/material";

export default function ItemDetailsOverview() {
    const {isAuthenticated} = useAuth();
    const {whiteListedShops} = useSettings();
    const {itemId} = useParams();
    const [searchParams] = useSearchParams();

    const {isLoading, isError, data} = useQuery(
        ["item", itemId],
        () => fetchItem(parseInt(itemId!!)),
        {
            enabled: !!itemId,
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error...</div>;

    const pricePerShop = limitShops(getWhiteListedTrackedItemsForItem(data, whiteListedShops))
        .sort(sortTrackedItemOnPriceAsc)

    return (
        <MainContainer
            backTrackableTo={
                searchParams.get("backTrackableTo") != null
                    ? searchParams.get("backTrackableTo")!
                    : "/"
            }
        >
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
                    />
                    <div className={"product-details-comparison"}>
                        {pricePerShop.length === 0 &&
                            <Typography variant={"h5"}>
                                We kunnen geen prijzen van dit product voor je vinden!
                            </Typography>}
                        {pricePerShop
                            .map(
                                (trackedItem) => (
                                    <PriceBar
                                        key={trackedItem.url}
                                        logoUrl={getShopLogoUrlByName(trackedItem.shop.name)!}
                                        price={
                                            orderedPrices(trackedItem.itemPrices).reverse()[0].price
                                        }
                                        percentageFilled={pricePercentageOnMax(orderedPrices(trackedItem.itemPrices).reverse()[0].price, limitShops(getWhiteListedTrackedItemsForItem(data, whiteListedShops)))}
                                        color={getShopDominantColorByName(trackedItem.shop.name)!}
                                        urlToItem={trackedItem.url}
                                    />
                                )
                            )}
                    </div>
                </div>
                <Divider sx={{visibility: "hidden", my: 10}}/>
                <HistoryChart trackedItems={limitShops(data.trackedItems)}/>
            </div>
        </MainContainer>
    );
}
