import { redirectToLogin } from "../../../utils/auth.util";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function LoginButton() {
  return (
    <Button
      className={"login-button"}
      sx={{
        color: "#FFF",
        border: "1px solid #FFF",
        gridAutoFlow: "column",
      }}
      onClick={redirectToLogin}
      endIcon={<ArrowForwardIcon />}
    >
      Aanmelden
    </Button>
  );
}
