// Library Imports
import React from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../../../../shared/components/spinner/index.js";

// Relative Imports
import { Auth, Logout } from "./styles";

const Buttons = ({ auth, onClick, isLoading }) => {
  const location = useLocation();

  return (
    <>
      {!auth && location.pathname === "/" && <Auth to="/login">Login</Auth>}
      {!auth && location.pathname === "/login" && <Auth to="/">Create</Auth>}
      {auth && (
        <Logout onClick={onClick}>{isLoading ? <Spinner /> : "Logout"}</Logout>
      )}
    </>
  );
};

export default Buttons;
