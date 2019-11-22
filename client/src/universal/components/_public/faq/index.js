// Library Imports
import React from "react";

// Relative Imports
import English from "./english/index.js";
import French from "./french/index.js";

const Content = ({ language }) => {
  return (
    <>
      {language === "english" && <English />}
      {language === "french" && <French />}
    </>
  );
};

export default Content;
