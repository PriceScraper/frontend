import "../style/MainContainer.scss";
import "../style/ProductDetails.scss";
import SearchArea from "../components/search/SearchArea";
import { fetchProduct, searchProduct } from "../services/product.service";
import MainContainer from "../components/containers/MainContainer";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function ProductDetails() {
  const { productId } = useParams<string>();

  const { isLoading, isError, data } = useQuery(
    ["product", productId],
    () => fetchProduct(productId!),
    {
      enabled: !!productId,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <MainContainer>
      <div className={"product-details"}>
        <SearchArea searchProductsHandler={searchProduct} />
        <img
          alt={"product image"}
          className={"product-details-img"}
          src={data?.img}
        />
        <h1>{data?.name}</h1>
      </div>
    </MainContainer>
  );
}
