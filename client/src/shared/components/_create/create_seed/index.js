// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Information } from "../../../../assets/styles/type.js";
import Seed from "../../_inputs/seed";
import { writeText } from "../../../../vendor/clipboard/clipboard-polyfill";

class CreateSeed extends Component {
  state = {
    action: "Copy Seed",
  };

  copySeed = () => {
    const seed = this.props.value;
    this.setState({
      action: "Seed Copied",
    });
    writeText(seed);

    setTimeout(() => {
      this.setState({
        action: "Copy Seed",
      });
    }, 1000);
  };

  render() {
    const {
      value,
      name,
      rows,
      action,
      actionEvent,
      readOnly,
      label,
      children,
      ...rest
    } = this.props;
    return (
      <>
        <Seed
          label={label}
          value={value}
          placeholder=""
          name={name}
          rows={rows}
          readOnly={readOnly}
          action={this.state.action}
          actionEvent={this.copySeed}
          rest={rest}
        />
        {children}
      </>
    );
  }
}

export default CreateSeed;
