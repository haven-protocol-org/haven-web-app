// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Wrapped, Button, Labeled } from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

const InputUpload = ({
  type,
  placeholder,
  label,
  error,
  onChange,
  name,
  value,
  width,
  readOnly,
  button,
  onClick,
}) => {
  return (
    <Container width={width}>
      'heere'
      <Labels>
        <Label>{label}</Label>
        <Error>{error}</Error>
      </Labels>
      <Wrapped>
        <Field
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        <Labeled htmlfor="file-upload">
          <Button id="file-upload" type="file" onChange={onChange}>
            {button}
          </Button>
        </Labeled>
      </Wrapped>
    </Container>
  );
};

export default InputUpload;
