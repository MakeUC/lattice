import React from "react";
import Deck from "../../components/Deck";
import Navigation from "../../components/Navigation";
import AppBar from "../../components/AppBar";

export default function Home() {
  return (
    <>
      <AppBar />
      <Deck />
      <Navigation />
    </>
  );
}
