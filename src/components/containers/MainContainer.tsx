import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className={"main-container"}>
      <div className={"main-content"}>{children}</div>
    </div>
  );
}
