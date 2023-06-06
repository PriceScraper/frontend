import "../../style/PriceBar.scss";
import {LinearProgress} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface PriceBarProps {
    logoUrl: string;
    price: number;
    percentageFilled: number;
    color: string;
    urlToItem: string
}

export default function PriceBar({
                                     logoUrl,
                                     price,
                                     percentageFilled,
                                     color,
                                     urlToItem
                                 }: PriceBarProps) {
    if (percentageFilled < 0 || percentageFilled > 100) return <></>;
    const style = {
        "--barColor": color,
        backgroundColor: "#e5e5e5",
    } as React.CSSProperties;
    return (
        <div className={"price-bar-container"}>
            <div className={"flexElements spaceBetweenElements"}>
                <img alt={"shop logo"} src={logoUrl} className={"price-bar-logo"}/>
                <div className={"flexElements spaceBetweenElements"}>
                    <h2 className={"price-bar-price"} style={{margin: "auto 2px"}}>€{price}</h2>
                    <OpenInNewIcon onClick={() => window.open(urlToItem)} fontSize={"small"}
                                   sx={{ml: 1, my: "auto", cursor: "pointer", color: "grey"}}/>
                </div>
            </div>
            <LinearProgress
                className={"price-bar"}
                variant="determinate"
                value={percentageFilled}
                style={style}
            />
        </div>
    );
}
