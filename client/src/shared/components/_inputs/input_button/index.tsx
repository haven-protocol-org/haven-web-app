// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Wrapped, Button } from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

type Ref = HTMLInputElement;
type Props = {
  type: string;
  placeholder: string;
  label: string;
  error?: string;
  onChange?: Function;
  name: string;
  value: any;
  button: string;
  width?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: (e: any) => void;
};

const InputButton = React.forwardRef<Ref, Props>(
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
      readOnly,
      button,
      onClick,
    },
    ref
  ) => {
    return (
      <Container width={width}>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Wrapped>
          <Field
            ref={ref}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
          <Button onClick={onClick}>{button}</Button>
        </Wrapped>
      </Container>
    );
  }
);

export default InputButton;
