import { RotateDiv } from "./styles";
import React from "react";
import Icon from "../../assets/haven.svg";

export const Spinner = ({ color = "grey", wh = 24 }) => {
  return <RotateDiv color={color} />;
};
