// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Error } from "./styles";
import { Label } from "../../../constants/type.js";
import Auth from "../../../pages/_auth/login";


const Description = ({ label, error, width, onClick, ref, type, ...rest }) => {

  return (
    <Container width={width}>
      <Labels>
        <Label>{label}</Label>
        <Error>{error}</Error>
      </Labels>
        <iframe style={{border: 'none'}} src={"http://127.0.0.1:8080/field.html"}></iframe>
        <Field ref={ref} {...rest} />
    </Container>
  );
};

export default Description;
