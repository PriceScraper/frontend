import {useMediaQuery} from "@mui/material";

const bigScreenQuery = "(min-width: 1000px)"
const smallScreenQuery = "(max-width: 500px)"
export default function usePreparedMediaQuery() {
    const isBigScreen = useMediaQuery(bigScreenQuery)
    const isSmallScreen = useMediaQuery(smallScreenQuery)
    return {isBigScreen, isSmallScreen, isMediumScreen: (!isBigScreen && !isSmallScreen)}
}
