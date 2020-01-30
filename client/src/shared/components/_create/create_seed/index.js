// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Information } from "../../../../assets/styles/type.js";
import Seed from "../../_inputs/seed";
import * as clipboard from "clipboard-polyfill";

class CreateSeed extends Component {
  state = {
    action: "Copy Seed"
  };

  copySeed = () => {
    const seed = this.props.value;
    this.setState({
      action: "Seed Copied"
    });
    clipboard.writeText(seed);

    setTimeout(() => {
      this.setState({
        action: "Copy Seed"
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
          A Seed Phrase is a algorithmically generated password and provides
          full access to your account and assets.{" "}
          <strong>
            Store your seed in a safe location and do not share this with
            anyone.
          </strong>
        </Information>
      </>
    );
  }
}

export default CreateSeed;
