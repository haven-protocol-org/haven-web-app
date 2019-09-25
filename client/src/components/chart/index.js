// Library Imports
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Spinner } from "../spinner/index.js";

// Relative Imports
import {
  Container,
  Placeholder,
  Message,
  Header,
  Spacer,
  Button,
  Buttons
} from "./styles";
import {PRICE_RANGE_DAY, PRICE_RANGE_MAX, PRICE_RANGE_MONTH, PRICE_RANGE_YEAR} from "../../reducers/priceHistory";

class Chart extends Component {
  state = {
    time: ""
  };

  render() {
    if (this.props.prices.length === 0) {
      return (
        <Placeholder>
          <Spinner />
          <Message>Fetching prices, hold on a sec...</Message>
        </Placeholder>
      );
    }

    return (
      <>
        <Header>
          <div>Price History</div>
          <Buttons>
            <Button onClick={()=>this.props.onChangePriceRange(PRICE_RANGE_DAY)}>1D</Button>
            <Button onClick={()=>this.props.onChangePriceRange(PRICE_RANGE_MONTH)}  active>1M</Button>
            <Button onClick={()=>this.props.onChangePriceRange(PRICE_RANGE_YEAR)} >1Y</Button>
            <Button onClick={()=>this.props.onChangePriceRange(PRICE_RANGE_MAX)} >ALL</Button>
          </Buttons>
        </Header>
        <Container>
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,

              legend: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    display: false,
                    gridLines: {
                      display: false
                    },
                    ticks: { callback: (value, index, values) => "$" + value }
                  }
                ],
                xAxes: [{ display: false }]
              },
              tooltips: {
                callbacks: {
                  label: function(item, data) {
                    return "$" + item.yLabel.toFixed(2);
                  }
                },
                yAlign: "bottom",
                xAlign: "center",
                xPadding: 20,
                yPadding: 15,
                bodyAlign: "center",
                footerAlign: "center",
                displayColors: false,
                titleFontSize: 18,
                bodyFontSize: 14,
                titleMarginBottom: 8,
                titleFontColor: "#fff",
                background: "rgba(21, 35, 44, 08)",
                bodyFontColor: "#999",
                bodySpacing: 10,
                titleFontFamily:
                  "Inter-SemiBold, 'Helvetica', 'Arial', sans-serif",
                bodyFontFamily:
                  "Inter-SemiBold, 'Helvetica', 'Arial', sans-serif"
              }
            }}
            data={{
              labels: this.props.labels,
              datasets: [
                {
                  backgroundColor: "rgba(114, 137, 218, 0.20)",
                  borderColor: "rgba(114, 137, 218, 1)",
                  pointBackgroundColor: "rgba(114, 137, 218, 1)",
                  data: this.props.prices
                }
              ]
            }}
          />
        </Container>
      </>
    );
  }
}

export default Chart;
