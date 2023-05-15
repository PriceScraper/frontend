import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { redirectToLogin } from "../../../utils/auth.util";

export default function LoginButton() {
  return (
    <IconButton onClick={redirectToLogin}>
      <LoginIcon sx={{ color: "white" }} />
    </IconButton>
  );
}
