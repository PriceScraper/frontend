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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={"a"}>
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
