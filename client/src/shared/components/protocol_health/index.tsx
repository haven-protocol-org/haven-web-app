import { HavenAppState } from "platforms/desktop/reducers";
import { Component } from "react";
import { connect } from "react-redux";
import { selectMcRatio } from "shared/reducers/circulatingSupply";

import { ColorRange, Container, Legend, LegendNumber, Pointer, RatioValue } from "./style";


interface ProtocolHealthProps {
  mcRatio: number | null

}

const bestHealth = 0;
const worstHealth = 2;


class ProtocolHealthComponent extends Component<ProtocolHealthProps, any> {
  
  render() {

    const mcRatio =  this.props.mcRatio;
    if(!mcRatio)
    {
      return null;
    }


    
    let pointerPosition = ((mcRatio - bestHealth)/ (worstHealth - bestHealth)) * 100;  
    pointerPosition = Math.max(pointerPosition, 0);
    pointerPosition = Math.min(pointerPosition, 100);
    
    return (
    <Container>
       <Legend>
        <span>Good State</span>
        <span>Bad State</span>
      </Legend>
      <ColorRange>
        <Pointer position={pointerPosition}></Pointer>
        <RatioValue position={pointerPosition}>{mcRatio.toFixed(3)}</RatioValue>
      </ColorRange>
      <Legend>
        <LegendNumber>0</LegendNumber>
        <LegendNumber>0.5</LegendNumber>
        <LegendNumber>1</LegendNumber>
        <LegendNumber>1.5</LegendNumber>
        <LegendNumber>2</LegendNumber>
      </Legend>
    
    </Container>
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
