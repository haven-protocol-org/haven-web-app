// Library Imports
import React from "react";

// Relative Imports
import { Information } from "../../../../assets/styles/type.js";
import Description from "../../_inputs/description";

const CreateSeed = ({ value, name, rows, readOnly, ...rest }) => {
  return (
    <>
      <Description
        label="Seed Phrase"
        value={value}
        placeholder=""
        name={name}
        rows={rows}
        readOnly={readOnly}
        rest={rest}
      />
      <Information>
        A Seed Phrase is a algorithmically generated password and provides full
        access to your account and assets.{" "}
        <strong>
          Store your seed in a safe location and do not share this with anyone.
        </strong>
      </Information>
    </>
  );
};

export default CreateSeed;
