// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels } from "./styles";
import { Label, Error } from "assets/styles/type.js";

type Ref = HTMLInputElement;
type Props = {
  type: string;
  placeholder: string;
  label: string;
  error?: string;
  onChange?: Function;
  name: string;
  value: any;
  width?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
};

const Input = React.forwardRef<Ref, Props>(
  (
    {
      type,
      placeholder,
      label,
      error,
      onChange,
      name,
      value,
      width,
      disabled,
      readOnly = false,
    },
    ref
  ) => {
    return (
      <Container grid={width}>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Field
          disabled={disabled}
          ref={ref}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </Container>
    );
  }
);

export default Input;
