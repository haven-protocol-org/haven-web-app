// Library Imports
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

// Relative Imports
import { Container } from "./styles";

class Chart extends Component {
  state = {
    price: "",
    data: {
      labels: [
        "May 17, 2019",
        "May 16, 2019",
        "May 15, 2019",
        "May 14, 2019",
        "May 13, 2019",
        "May 12, 2019",
        "May 11, 2019",
        "May 10, 2019",
        "May 09, 2019",
        "May 08, 2019",
        "May 07, 2019",
        "May 06, 2019",
        "May 05, 2019",
        "May 04, 2019",
        "May 03, 2019",
        "May 02, 2019",
        "May 01, 2019",
        "Apr 30, 2019",
        "Apr 29, 2019",
        "Apr 28, 2019",
        "Apr 27, 2019",
        "Apr 26, 2019",
        "Apr 25, 2019",
        "Apr 24, 2019",
        "Apr 23, 2019",
        "Apr 22, 2019",
        "Apr 21, 2019",
        "Apr 20, 2019",
        "Apr 19, 2019",
        "Apr 18, 2019"
      ],
      datasets: [
        {
          backgroundColor: "rgba(114, 137, 218, 0.20)",
          borderColor: "rgba(114, 137, 218, 1)",
          pointBackgroundColor: "rgba(114, 137, 218, 1)",
          data: [
            0.427421,
            0.405606,
            0.349369,
            0.333474,
            0.342257,
            0.371002,
            0.343667,
            0.335553,
            0.356181,
            0.364191,
            0.388496,
            0.419946,
            0.438367,
            0.433829,
            0.460076,
            0.476515,
            0.494777,
            0.471171,
            0.50381,
            0.503143,
            0.512616,
            0.505723,
            0.538658,
            0.606539,
            0.493211,
            0.485524,
            0.513618,
            0.457014,
            0.448876,
            0.460506
          ]
        }
      ]
    }
  };

  doSomething = value => {
    alert(value);
  };

  render() {
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
              yAxes: [{ display: false }],
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
          data={this.state.data}
        />
      </Container>
    );
  }
}

export default Chart;
