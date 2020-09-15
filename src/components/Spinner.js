import React from "react";

import '../styles/Spinner.css';

export default function({ size = `100px` }) {
  return <div id="spinner-container">
    <img
      id="spinner"
      src="/lattice/logo.png"
      alt="Lattice logo"
      style={{ width: size, height: size }}
    />
  </div>;
}
