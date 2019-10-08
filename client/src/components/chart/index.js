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
  Button,
  Buttons,
  Title
} from "./styles";
import {
  PRICE_RANGE_DAY,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MONTH,
  PRICE_RANGE_YEAR
} from "../../reducers/priceHistory";
import { isDevMode } from "../../constants/env";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartJs = React.createRef();
  }
  state = {
    activeDay: "1M",
    hoveredValue: "",
    hoveredLabel: ""
  };

  toggleDay = time => {
    this.setState({
      activeDay: time
    });
  };

  onHoverChart(event) {
    const hoveredElementArr = this.chartJs.chartInstance.getElementAtEvent(
      event
    );

    if (hoveredElementArr.length === 0) return;

    const hoveredElement = hoveredElementArr[0];

    const label = this.chartJs.chartInstance.data.labels[hoveredElement._index];
    const value = this.chartJs.chartInstance.data.datasets[
      hoveredElement._datasetIndex
    ].data[hoveredElement._index];

    this.setState(prev => ({
      ...prev,
      hoveredLabel: label,
      hoveredValue: "$" + value.toFixed(2)
    }));
  }

  render() {
    const { activeDay } = this.state;
    const dateRangeButtons = (
      <Buttons>
        <Button
          onClick={() => {
            this.props.onChangePriceRange(PRICE_RANGE_DAY);
            this.toggleDay("1D");
          }}
          active={activeDay === "1D" && true}
        >
          1D
        </Button>
        <Button
          onClick={() => {
            this.props.onChangePriceRange(PRICE_RANGE_MONTH);
            this.toggleDay("1M");
          }}
          active={activeDay === "1M" && true}
        >
          1M
        </Button>
        <Button
          onClick={() => {
            this.props.onChangePriceRange(PRICE_RANGE_YEAR);
            this.toggleDay("1Y");
          }}
          active={activeDay === "1Y" && true}
        >
          1Y
        </Button>
        <Button
          onClick={() => {
            this.props.onChangePriceRange(PRICE_RANGE_MAX);
            this.toggleDay("ALL");
          }}
          active={activeDay === "ALL" && true}
        >
          ALL
        </Button>
      </Buttons>
    );
    if (this.props.prices.length === 0) {
      return (
        <>
          <Header>
            <Title>Price History</Title>
            {dateRangeButtons}
          </Header>
          <Placeholder>
            <Spinner />
            <Message>Fetching prices, hold on a sec...</Message>
          </Placeholder>
        </>
      );
    }

    return (
      <>
        <Header>
          <Title>Price History</Title>
          {dateRangeButtons}

          {isDevMode()
            ? this.state.hoveredLabel + " " + this.state.hoveredValue
            : ""}
        </Header>
        <Container>
          <Line
            ref={ref => (this.chartJs = ref)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              onHover: event => this.onHoverChart(event),

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
