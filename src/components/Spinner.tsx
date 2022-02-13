import React from "react";

import '../styles/Spinner.css';

const Spinner = ({ size = `100px` }) => {
  return <div id="spinner-container">
    <img
      id="spinner"
      src="/logo.svg"
      alt="Lattice logo"
      style={{ width: size, height: size }}
    />
  </div>;
};

export default Spinner;
