import React, { Component } from "react";

const graphWidth = 120;
const graphHeight = 45;
const containerHeight = 45;

export class AssetGraph extends Component {
  transformIntoChart(prices) {
    const xPointDistance = graphWidth / (prices.length - 1);

    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);

    let yPointDelta = graphHeight / (highestPrice - lowestPrice);

    const pricePoints = prices.map((price, index) => {
      const xPos = index * xPointDistance;
      let yPos;
      if (this.props.ticker === "USD") {
        yPos = graphHeight / 2;
      } else {
        yPos = (highestPrice - price) * yPointDelta;
      }
      return [xPos, yPos];
    });

    return pricePoints;
  }

  render() {
    const chartPoints = this.transformIntoChart(this.props.prices);
    const pricePointString = chartPoints.map(
      pricePoint => `${pricePoint[0]},${pricePoint[1]}`
    );

    let xPosStart = chartPoints[0][0];

    let xPosEnd = chartPoints[chartPoints.length - 1][0];

    const chartPointString = `${xPosStart},${containerHeight},${pricePointString},${xPosEnd},${containerHeight}`;

    return (
      <svg
        style={{
          marginTop: "10px",
          display: "block",
          marginBottom: "0",
          padding: "0"
        }}
        width={"120px"}
        height={containerHeight}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={"none"}
      >
        <polyline
          points={pricePointString}
          style={{
            fill: "none",
            stroke: "rgba(114, 137, 218, 1)",
            strokeLinecap: "butt",
            strokeWidth: "2px",
            shapeRendering: "geometricPrecision"
          }}
        />
        <polyline
          points={chartPointString}
          style={{ stroke: "none", fill: "rgba(114, 137, 218, 0.20)" }}
        />
      </svg>
    );
  }
}
