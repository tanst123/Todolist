import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import React from "react";
const Content: React.FC = () => {
  const context = useContext(ThemeContext);
  return (
    <>
      <h1 className={context?.theme} style={{ width: "100%" }}>
        Hello Word
      </h1>
    </>
  );
};

export default Content;
