import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import useItems from "../../hooks/useItems";
import { useNavigate } from "react-router-dom";

interface SuggestionCardProps {
  img: string;
  title: string;
  subtitle?: string;
}

export default function SuggestionCard({
  img,
  title,
  subtitle,
}: SuggestionCardProps) {
  const navigate = useNavigate();
  const { setFilter } = useItems();

  function handleClick() {
    setFilter(title);
    navigate("/items/search");
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={"a"} onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="search suggestion"
          sx={{ objectFit: "contain", backgroundColor: "#bde0fe" }}
        />
        <CardContent sx={{ paddingBottom: "0.3rem" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <IconButton size="small">
            <ArrowForward />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
