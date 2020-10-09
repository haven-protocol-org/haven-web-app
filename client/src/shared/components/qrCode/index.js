// Library Imports
import React from "react";
import QRCode from "react-qr-code";
// Relative Imports
import { Container, Value, Wrapper, Inner } from "./styles";

const QrCode = ({ address }) => {
  return (
    <Container>
      <Wrapper>
        <QRCode value={address} />
      </Wrapper>
      <Inner>
        <Value>{address}</Value>
      </Inner>
    </Container>
  );
};

export default QrCode;
