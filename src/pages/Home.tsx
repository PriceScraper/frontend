import "../style/MainContainer.scss";
import "../style/Home.scss";
import MainContainer from "../components/layout/MainContainer";
import SuggestionCard from "../components/layout/SuggestionCard";

export default function Home() {
  return (
    <MainContainer showHeader={true} headerMsg={"Vind de laagste prijzen"}>
      <h3 className={"home-suggestions-msg"}>
        Merk het verschil, hier zijn enkele suggesties...
      </h3>
      <div className={"home-suggestions"}>
        <SuggestionCard
          img={
            "https://static.vecteezy.com/system/resources/previews/008/848/350/original/fresh-yellow-banana-fruit-free-png.png"
          }
          title={"Bananen"}
          subtitle={"Fruit"}
        />
        <SuggestionCard
          img={
            "https://shop.oxfamwereldwinkels.be/halle-beersel/wp-content/uploads/sites/68/Volle-melk-1L-Fairebel-1000x1000.png"
          }
          title={"Melk"}
          subtitle={"Zuivel"}
        />
        <SuggestionCard
          img={
            "https://www.neuhauschocolates.com/dw/image/v2/BFRH_PRD/on/demandware.static/-/Library-Sites-NeuhausSharedLibrary/default/dwfd351771/Pralines_A-S/5024195%20Heart%20milk_almond_sesame_closed_hr.png"
          }
          title={"Chocolade"}
          subtitle={"Snoep & chocolade"}
        />
        <SuggestionCard
          img={
            "https://www.prikentik.be/media/catalog/product/c/o/coca-cola-light-pet-1-5l.png"
          }
          title={"Cola"}
          subtitle={"Frisdrank"}
        />
      </div>
    </MainContainer>
  );
}
