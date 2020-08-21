import React from "react";
import Deck from "../../components/Deck";
import Navigation from "../../components/Navigation";
import AppBar from "../../components/AppBar";
import Profile from '../profile/Profile';

export default function Home() {
  return (
    <>
      <AppBar />
      {/* <Deck /> */}
      <Profile />
      <Navigation />
    </>
  );
}
