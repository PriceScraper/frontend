import "../../style/PriceBar.scss";
import { LinearProgress } from "@mui/material";

interface PriceBarProps {
  logoUrl: string;
  price: number;
  percentageFilled: number;
  color: string;
}

export default function PriceBar({
  logoUrl,
  price,
  percentageFilled,
  color,
}: PriceBarProps) {
  if (percentageFilled < 0 || percentageFilled > 100) return <></>;
  const style = {
    "--barColor": color,
    backgroundColor: "#e5e5e5",
  } as React.CSSProperties;
  return (
    <div className={"price-bar-container"}>
      <img alt={"shop logo"} src={logoUrl} className={"price-bar-logo"} />
      <LinearProgress
        className={"price-bar"}
        variant="determinate"
        value={percentageFilled}
        style={style}
      />
      <h2 className={"price-bar-price"}>€{price}</h2>
    </div>
  );
}
