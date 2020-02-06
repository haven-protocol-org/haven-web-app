// Library Imports
import React from "react";

// Relative Imports
import { Separator, Line, Circle, Icon } from "./styles";
import complete from "../../../../assets/icons/tick.svg";
import incomplete from "../../../../assets/icons/incomplete_dark.svg";

const TimelineSeparator = ({ progress }) => {
  return (
    <Separator>
      <Line />
      <Circle complete={progress}>
        <Icon src={progress === "complete" ? complete : incomplete} />
      </Circle>
      <Line />
    </Separator>
  );
};

export default TimelineSeparator;
