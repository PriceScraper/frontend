import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";

export default function LoginButton() {
  const redirect = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}`;
  };

  return (
    <IconButton onClick={redirect}>
      <LoginIcon sx={{ color: "white" }} />
    </IconButton>
  );
}
