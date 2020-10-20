// Library Imports
import React from "react";
import { useLocation } from "react-router-dom";

// Relative Imports
import { Auth, Logout } from "./styles";

const Buttons = ({ auth, onClick }) => {
  const location = useLocation();

  return (
    <>
      {!auth && location.pathname === "/" && <Auth to="/create">Create</Auth>}
      {!auth && location.pathname === "/create" && <Auth to="/">Sign In</Auth>}
      {auth && <Logout onClick={onClick}>Logout</Logout>}
    </>
  );
};

export default Buttons;
