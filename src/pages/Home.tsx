import "../style/MainContainer.scss";
import { searchProduct } from "../services/product.service";
import SearchArea from "../components/search/SearchArea";
import MainContainer from "../components/containers/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <SearchArea searchProductsHandler={searchProduct} />
    </MainContainer>
  );
}
