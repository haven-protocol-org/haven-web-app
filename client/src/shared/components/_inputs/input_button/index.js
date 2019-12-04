// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Wrapped, Button } from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

const InputButton = React.forwardRef(
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
      onClick
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
