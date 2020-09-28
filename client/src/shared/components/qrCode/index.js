// Library Imports
import React from "react";
import QRCode from "react-qr-code";
// Relative Imports
import { Container } from "./styles";

const QrCode = ({ address }) => {
  return (
    <Container>
      <QRCode value={address} />
    </Container>
  );
};

export default QrCode;
