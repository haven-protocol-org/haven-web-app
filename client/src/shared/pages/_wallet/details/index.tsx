// Library Imports
import React, { Component } from "react";
// Relative Imports
import Body from "../../../components/_layout/body";
import { ChartContainer } from "shared/components/chart-container";


interface DetailsProps {
  amount:number,
  price:number,
  value:number,
  assetId: string;
}

export class Details extends Component<DetailsProps, any> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Body>
        <ChartContainer {...this.props} />
        {this.props.children}
      </Body>
    );
  }
}
