import React from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";
import { useProfile } from "../../providers/ProfileProvider";
import { Container } from "@material-ui/core";

export default function () {
  const { profile } = useProfile();

  return (
    <>
      {profile.visible ?
        <Deck /> :
        <Container className="nav-bar-margin">
          <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
            {!profile.started ? 
              <>
                Welcome! Let's get you set up. Head over to your <Link to="/your_profile">profile page</Link> to get started.
              </> :
              !profile.completed ?
                <>
                  Welcome back! Head over to your <Link to="/your_profile">profile page</Link> to complete your profile and start searching for potential teammates!
                </> :
                <>
                  Welcome back! Mark your profile "visible" from your <Link to="/profile">profile page</Link> to start searching for potential teammates!
                </>
            }
          </div>
        </Container>
      }
    </>
  );
}
