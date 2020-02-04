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
  Title,
  PriceHistory,
  Value,
  Label
} from "./styles";
import {
  PRICE_RANGE_DAY,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MONTH,
  PRICE_RANGE_YEAR
} from "../../reducers/priceHistory";

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

  componentDidMount() {
    this.setState({
      hoveredValue: this.props.price,
      hoveredLabel: "Last Price"
    });
  }

  toggleDay = time => {
    this.setState({
      activeDay: time
    });
  };

  onHoverChart(data) {
    const dataPoint = data.dataPoints ? data.dataPoints[0] : null;
    if (!dataPoint) return;

    const label = dataPoint.xLabel;
    const value = dataPoint.yLabel;

    this.setState(prev => ({
      ...prev,
      hoveredLabel: label,
      hoveredValue: "$" + value.toFixed(4)
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
        </Header>
        <PriceHistory>
          <Value>{this.state.hoveredValue}</Value>
          <Label>{this.state.hoveredLabel}</Label>
        </PriceHistory>
        <Container>
          <Line
            ref={ref => (this.chartJs = ref)}
            options={{
              hover: {
                mode: "index"
              },
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
                enabled: false,
                mode: "index",
                intersect: false,
                custom: data => this.onHoverChart(data)
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
