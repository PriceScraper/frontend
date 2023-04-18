import "../../style/MainContainer.scss";
import "../../style/ProductDetailsOverview.scss";
import { fetchItem } from "../../services/item.service";
import MainContainer from "../../components/layout/MainContainer";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import PriceBar from "../../components/layout/PriceBar";

export default function ItemDetailsOverview() {
  const { itemId } = useParams<string>();

  const { isLoading, isError, data } = useQuery(
    ["item", itemId],
    () => fetchItem(itemId!),
    {
      enabled: !!itemId,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error...</div>;

  return (
    <MainContainer showHeader={true}>
      <div className={"product-details"}>
        <div className={"product-details-hero-section"}>
          <img
            alt={"product"}
            className={"product-details-img"}
            src={data?.image}
          />

          <div className={"product-details-comparison"}>
            <PriceBar
              logoUrl={"https://cdn.worldvectorlogo.com/logos/colruyt.svg"}
              price={5.45}
              percentageFilled={20}
              color={"#F07E13"}
            />
            <PriceBar
              logoUrl={
                "https://www.carrefour.be/etc/clientlibs/carrefour/main/css/img/carrefour-logo.svg"
              }
              price={5.49}
              percentageFilled={20}
              color={"#004E9E"}
            />
            <PriceBar
              logoUrl={
                "https://logowik.com/content/uploads/images/delhaize8693.jpg"
              }
              price={5.49}
              percentageFilled={20}
              color={"rgb(207, 20, 49)"}
            />
          </div>
        </div>
        <h1>{data?.name}</h1>
      </div>
    </MainContainer>
  );
}
