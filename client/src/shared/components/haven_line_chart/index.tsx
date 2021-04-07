import React, { Component } from "react";
import { Ticker } from "shared/reducers/types";

 const graphWidth = 100;
 const graphHeight = 100;
 const containerHeight = 180;


 interface HavenLineChartProps {
     prices:any | undefined;
     ticker: Ticker;
     lineColor: string;
 }

 export class HavenLineChart extends Component<HavenLineChartProps,{}> {

   transformIntoChart(prices: any) {
     const xPointDistance = graphWidth / (prices.length - 1);

     const highestPrice = Math.max(...prices);
     const lowestPrice = Math.min(...prices);

     let yPointDelta = graphHeight / (highestPrice - lowestPrice);

     const pricePoints = prices.map((price: number, index: number) => {
       const xPos = index * xPointDistance;
       let yPos;
       if (this.props.ticker === Ticker.xUSD) {
         yPos = graphHeight / 2;
       } else {
         yPos = (highestPrice - price) * yPointDelta;
       }
       return [xPos, yPos];
     });

     return pricePoints;
   }

   render() {


    if ((!this.props.prices) || this.props.prices.length === 0){
      return null;
    }
     const chartPoints = this.transformIntoChart(this.props.prices);
     const pricePointString: string = chartPoints.map(
       (pricePoint:[number, number]) => `${pricePoint[0]},${pricePoint[1]}`
     );

     let xPosStart: number = chartPoints[0][0];

     let xPosEnd: number = chartPoints[chartPoints.length - 1][0];

     const chartPointString = `${xPosStart},${containerHeight},${pricePointString},${xPosEnd},${containerHeight}`;

     return (
       <svg
        style={{
          marginTop:5,
          marginBottom:5

        }}
         viewBox={"0 0 100 100"}
         height={containerHeight}
         width={"100%"}
         xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio={"none"}
        
       >
         <polyline
           points={pricePointString}
           vectorEffect={"non-scaling-stroke"}
           style={{
             fill: "none",
             stroke:this.props.lineColor,
             strokeLinecap: "round",
             strokeLinejoin: "round",
             strokeWidth: "3px",
             shapeRendering: "geometricPrecision"
           }}
         />
  
       </svg>
     );
   }
 }