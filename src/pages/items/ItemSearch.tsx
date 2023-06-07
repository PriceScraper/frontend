import SearchBar from "../../components/search/SearchBar";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import useItems from "../../hooks/useItems";
import "./../../style/flexElements.scss";
import noResultsImg from "../../img/noresults.png";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";
import { Item } from "../../models/Item";
import { LoadingArea } from "../recipe/ModifyRecipe";
import { shortenNameIfTooLong } from "../../utils/item.util";
import usePreparedMediaQuery from "../../hooks/usePreparedMediaQuery";

export default function ItemSearch() {
  const { loading, items, filter, noResults } = useItems();

  const msg =
    items.length === 1 ? (
      <>We hebben {items.length} resultaat gevonden voor jouw zoekopdracht!</>
    ) : (
      <>We hebben {items.length} resultaten gevonden voor jouw zoekopdracht!</>
    );

  return (
    <>
      <MainContainer backTrackableTo={"/"} headerMsg={"Zoeken"} large={true}>
        <SearchBar displayResults={false} />
        {loading && (
          <div style={{ marginTop: 20 }}>
            <LoadingArea />
          </div>
        )}

        {!loading && noResults && <FailedToFindItemsForSearch />}
        {!loading && items.length === 0 && filter.length < 3 && (
          <>
            We kunnen pas producten voor u opzoeken wanneer u minstens 3
            karakters ingevuld hebt!
          </>
        )}

        {!loading && items.length > 0 && (
          <>
            <Typography variant={"h6"} sx={{ my: 2 }}>
              {msg}
            </Typography>
            <SearchList items={items} />
          </>
        )}
      </MainContainer>
    </>
  );
}

function SearchList({ items }: { items: Item[] }) {
  const { isSmallScreen, isMediumScreen, isExtraBigScreen } =
    usePreparedMediaQuery();

  const navigate = useNavigate();
  const useImgSize = isSmallScreen ? 75 : 150;
  const useCols = isSmallScreen
    ? 2
    : isMediumScreen
    ? 3
    : isExtraBigScreen
    ? 5
    : 4;

  return (
    <ImageList
      variant="standard"
      cols={useCols}
      gap={isSmallScreen ? 10 : 15}
      sx={{ width: "100%", height: 350 }}
    >
      {items.map((item) => (
        <ImageListItem
          sx={{ cursor: "pointer" }}
          key={item.id}
          onClick={() =>
            navigate(`/item/${item.id}?backTrackableTo=/items/search`)
          }
        >
          <img
            src={`${item.image}`}
            alt={item.name}
            style={{
              maxWidth: useImgSize,
              maxHeight: useImgSize,
              margin: "1px auto",
            }}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{ textAlign: "center", fontSize: "1.1rem", fontWeight: 500 }}
            position="below"
            title={shortenNameIfTooLong(item.name, isSmallScreen ? 15 : 25)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function FailedToFindItemsForSearch() {
  return (
    <div className={"flexElements centerElements"}>
      <div>
        <div className={"flexElements centerElements"}>
          <img
            src={noResultsImg}
            alt={"no results"}
            height={150}
            style={{ margin: 30 }}
          />
        </div>
        <Typography>We konden dit product niet vinden in de rekken!</Typography>
      </div>
    </div>
  );
}
