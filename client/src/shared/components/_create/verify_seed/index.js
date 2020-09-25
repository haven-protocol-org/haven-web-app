// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Information } from "../../../../assets/styles/type.js";
import Seed from "../../_inputs/seed";

class VerifySeed extends Component {
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
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
          Please verify the seed phrase you were provided on the previous step.
          This will ensure that you've saved it correctly and will enable you to
          restore the vault and all of its funds. Do not share this with anyone
          as it provides full access to your vault and all of its assets.
        </Information>
      </>
    );
  }
}

export default VerifySeed;
