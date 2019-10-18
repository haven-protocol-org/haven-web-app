import { RotateDiv } from "./styles";
import React from "react";

export const SyncBar = ({ bHeight, scannedHeight, barWidth = 100, barHeight = 10 }) => {

  const progressWidth = parseInt((scannedHeight / bHeight ) * barWidth);


  const outerdiv = {

    height:barHeight + 'px',
    backgroundColor: 'yellow',
    width: barWidth + 'px'
  };


  const innerdiv = {
    height:barHeight + 'px',
    backgroundColor: 'red',
    width:progressWidth + 'px'
  };



  return (
      <div>
      <div style={outerdiv}>
        <div style={innerdiv}>

        </div>
      </div>
        {scannedHeight} / {bHeight}
      </div>
  );
};
