import React from "react";
import HeaderBar from "./HeaderBar";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

interface MainContainerProps {
  children?: React.ReactNode;
  headerMsg?: string;
  backTrackableTo?: string;
  showHeader?: boolean;
}

export default function MainContainer({
  children,
  headerMsg,
  backTrackableTo,
  showHeader,
}: MainContainerProps) {
  return (
    <div className={"main-container"}>
      {backTrackableTo && (
        <Link className={"main-back"} to={backTrackableTo}>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
      )}
      {headerMsg && (
        <h2
          className={backTrackableTo ? "main-msg back-trackable" : "main-msg"}
        >
          {headerMsg}
        </h2>
      )}
      {showHeader && <HeaderBar />}
      <div className={"main-content"}>{children}</div>
    </div>
  );
}
