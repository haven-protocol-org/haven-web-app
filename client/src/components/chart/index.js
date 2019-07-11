// Library Imports
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

// Relative Imports
import { Container } from "./styles";

class Chart extends Component {





  render() {

    if (this.props.prices.length === 0)
    {
      return <p>...we are fetching prices, hold on...</p>;
    }


    return (

      <Container>
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: false
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{ display: true }],
              xAxes: [{ display: false }]
            },
            tooltips: {
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
              bodyFontFamily: "Inter-SemiBold, 'Helvetica', 'Arial', sans-serif"
            }
          }}
          data={{
            labels: this.props.labels,
            datasets: [
          {
            backgroundColor: "rgba(114, 137, 218, 0.20)",
            borderColor: "rgba(114, 137, 218, 1)",
            pointBackgroundColor: "rgba(114, 137, 218, 1)",
            data:this.props.prices
          }
            ]
          }}
        />
      </Container>
    );
  }
}

export default Chart;
