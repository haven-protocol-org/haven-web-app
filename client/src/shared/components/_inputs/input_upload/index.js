// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Field,
  Labels,
  Wrapped,
  Upload,
  Download,
  Labeled,
} from "./styles";
import { Label } from "../../../../assets/styles/type.js";

// NOTE: This is a non input, that looks like an input for consistency purposes

const InputUpload = ({
  type,
  label,
  name,
  value,
  width,
  button,
  onClick,
  action,
}) => {
  return (
    <Container width={width}>
      <Labels>
        <Label>{label}</Label>
      </Labels>
      <Wrapped>
        <Field>{value}</Field>
        {action === "download" && (
          <Labeled>
            <Download href={value} download>
              {button}
            </Download>
          </Labeled>
        )}
        {action === "upload" && (
          <Labeled>
            <Upload>{button}</Upload>
          </Labeled>
        )}
      </Wrapped>
    </Container>
  );
};

export default InputUpload;
