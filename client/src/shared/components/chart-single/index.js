// Library Imports
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

// Relative Imports
import { Container } from "./styles";

class ChartSingle extends Component {
  state = {
    price: "",
    data: {
      labels: [],
      datasets: [{ data: [] }]
    }
  };

  componentDidMount() {
    const updateLabel = { ...this.state.data };
    updateLabel.label = this.props.labels;
    const updateData = { ...this.state.data.datasets };
    updateData.data = this.props.data;
    this.setState({
      updateLabel: updateLabel,
      updateData: updateData
    });
  }

  render() {
    console.log("DATA", this.state);
    return (
      <Container>
        <Line
          options={{
            backgroundColor: "rgba(114, 137, 218, 0.20)",
            borderColor: "rgba(114, 137, 218, 1)",
            pointBackgroundColor: "rgba(114, 137, 218, 1)",
            responsive: true,
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

export default ChartSingle;



