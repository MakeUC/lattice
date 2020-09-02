import React, { useState, useEffect } from "react";
import Deck from "../../components/Deck";
import { useProfile } from "../../providers/ProfileProvider";

export default function () {
  const { profile } = useProfile();
  const [ redirect, setRedirect ] = useState();

  useEffect(() => {
    // if(profile.visible) 
  }, []);

  return (
    <>
      <Deck />
    </>
  );
}
