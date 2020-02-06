// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Information } from "../../../../assets/styles/type.js";
import Seed from "../../_inputs/seed";

class VerifySeed extends Component {
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      name,
      loading,
      value,
      onChange,
      error,
      label,
      placeholder,
      rows,
      action,
      onClick,
      ...rest
    } = this.props;
    return (
      <>
        <Seed
          label={label}
          placeholder={placeholder}
          name={name}
          value={value}
          error={error}
          onChange={onChange}
          rest={rest}
          rows={rows}
          loading={loading}
          action={action}
          actionEvent={onClick}
        />

        <Information>
          Please verify your Seed Phrase this will ensure that your Seed Phrase
          has been correctly backed up.{" "}
          <strong>
            Store your seed in a safe location and do not share this with anyone
          </strong>
        </Information>
      </>
    );
  }
}

export default VerifySeed;
