import "../../style/EmptyHint.scss";
import { Box } from "@mui/material";
import React from "react";

interface EmptyHintProps {
  icon: React.ReactNode;
  description: React.ReactNode;
}

export default function EmptyHint({ description, icon }: EmptyHintProps) {
  return (
    <Box sx={{ display: "grid", justifyItems: "center" }}>
      <div className={"empty-hint-icon"}>{icon}</div>
      <div className={"empty-hint-description"}>{description}</div>
    </Box>
  );
}
