import React from "react";
import Container from "../component/Container";
import { ThemeContext } from "../component/ThemeContext";
import "../style/style.scss";
import { useContext } from "react";

const TiktokView:React.FC = () => {
  const context = useContext(ThemeContext);
  
  return (
    <div style={{ width: "100%" }}>
      <Container />
      <button onClick={context?.handleToggle}>Toggle</button>
    </div>
  );
};

export default TiktokView;
