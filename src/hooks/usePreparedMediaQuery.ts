import {useMediaQuery} from "@mui/material";

const extraBigScreenQuery = "(min-width: 1200px)"
const bigScreenQuery = "(min-width: 1000px)"
const smallScreenQuery = "(max-width: 500px)"
export default function usePreparedMediaQuery() {
    const isBigScreen = useMediaQuery(bigScreenQuery)
    const isExtraBigScreen = useMediaQuery(extraBigScreenQuery)
    const isSmallScreen = useMediaQuery(smallScreenQuery)
    return {isBigScreen, isSmallScreen, isMediumScreen: (!isBigScreen && !isSmallScreen), isExtraBigScreen}
}
