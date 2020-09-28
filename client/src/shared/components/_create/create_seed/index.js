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
      ...rest
    } = this.props;
    return (
      <>
        <Seed
          label="Seed Phrase"
          value={value}
          placeholder=""
          name={name}
          rows={rows}
          readOnly={readOnly}
          action={this.state.action}
          actionEvent={this.copySeed}
          rest={rest}
        />
        <Information>
          Your seed phrase was cryptographically generated in a safe and secure
          manner. Now is a good time to save it to a safe location such as a
          reputable password manager or with a pen and pad. On the next step you
          will be asked to verify the seed to ensure you've backed it up.
        </Information>
      </>
    );
  }
}

export default CreateSeed;
