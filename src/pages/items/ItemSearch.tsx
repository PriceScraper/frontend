import SearchBar from "../../components/search/SearchBar";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import useItems from "../../hooks/useItems";
import "./../../style/flexElements.scss";
import noResultsImg from "../../img/noresults.png";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";
import { Item } from "../../models/Item";
import useItemSearchProgress from "../../hooks/useItemSearchProgress";
import LinearProgress from "@mui/material/LinearProgress";

export default function ItemSearch() {
  const { loading, items, filter, noResults } = useItems();

  const msg =
    items.length === 1 ? (
      <>We hebben {items.length} resultaat gevonden voor jouw zoekopdracht!</>
    ) : (
      <>We hebben {items.length} resultaten gevonden voor jouw zoekopdracht!</>
    );

  return (
    <MainContainer backTrackableTo={"/"} headerMsg={"Zoeken"}>
      <SearchBar displayResults={false} />
      {loading && <LoadingResults />}

      {!loading && noResults && <FailedToFindItemsForSearch />}
      {!loading && items.length === 0 && filter.length < 3 && (
        <>
          We kunnen pas producten voor u opzoeken wanneer u minstens 3 karakters
          ingevuld hebt!
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
  );
}

function SearchList({ items }: { items: Item[] }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", height: 350, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={12}>
        {items.map((item) => (
          <ImageListItem sx={{ cursor: "pointer" }} key={item.id}>
            <img
              onClick={() => navigate(`/item/${item.id}`)}
              src={`${item.image}`}
              alt={item.name}
            />
            <ImageListItemBar
              sx={{ textAlign: "center", fontSize: "1.1rem", fontWeight: 500 }}
              position="below"
              title={item.name}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
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

export function LoadingResults() {
  const { progress, potentialItems } = useItemSearchProgress();

  return (
    <div className={"flexElements centerElements"}>
      <Typography sx={{ mt: 2 }}>
        {potentialItems > 0 ? (
          <>
            We zijn er zo meteen!
            <br />
            <small>
              We zijn {potentialItems} potentiële items aan het bekijken!
            </small>
          </>
        ) : (
          <>We zijn jouw zoekopdracht aan het verwerken!</>
        )}
      </Typography>
      <LinearProgress
        sx={{ my: 2, width: "100%", height: 10 }}
        variant="determinate"
        value={progress}
      />
      <Box sx={{ width: "100%", height: 350, overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={3} gap={12}>
          {Array.from(Array(5).keys()).map((i) => (
            <ImageListItem key={i} sx={{ cursor: "pointer" }}>
              <Skeleton variant="rectangular" width={200} height={250} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}
