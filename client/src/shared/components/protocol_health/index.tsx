import { HavenAppState } from "platforms/desktop/reducers";
import { Component } from "react";
import { connect } from "react-redux";
import { selectMcRatio } from "shared/reducers/circulatingSupply";

import { ColorRange, Legend, LegendNumber, Pointer, RatioValue } from "./style";


interface ProtocolHealthProps {
  mcRatio: number | null

}

const bestHealth = .05;
const worstHealth = 5;
const logBestHealth = Math.log10(bestHealth);
const logWorstHealth = Math.log10(worstHealth);


class ProtocolHealthComponent extends Component<ProtocolHealthProps, any> {
  
  render() {

    const mcRatio =  this.props.mcRatio;
    if(!mcRatio)
    {
      return null;
    }

    const pointerPosition = Math.round((Math.log10(mcRatio) / (logBestHealth + logWorstHealth)) * 10);
  
    return (
    <div>
       <Legend>
        <span>Good State</span>
        <span>Bad State</span>
      </Legend>
      <ColorRange>
        <Pointer position={pointerPosition}></Pointer>
        <RatioValue position={pointerPosition}>~{mcRatio.toFixed(3)}</RatioValue>
      </ColorRange>
      <Legend>
        <LegendNumber>0.05</LegendNumber>
        <LegendNumber>0.25</LegendNumber>
        <LegendNumber>0.5</LegendNumber>
        <LegendNumber>2.5</LegendNumber>
        <LegendNumber>5</LegendNumber>
      </Legend>
    
    </div>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  mcRatio: selectMcRatio(state),
});
export const ProtocolHealth = connect(
  mapStateToProps,
  {}
)(ProtocolHealthComponent);
