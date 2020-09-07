import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";
import { useProfile } from "../../providers/ProfileProvider";
import { Container } from "@material-ui/core";

export default function () {
  const { isLoading, profile, profiles, skills } = useProfile();
  const [ hydratedProfiles, setHydratedProfiles ] = useState();

  useEffect(() => {
    if(skills.length) {
      const hydratedProiles = profiles.map(profile => {
        const profileSkills = skills.filter(skill => profile?.skills?.includes(skill.title));
        const profileLookingFor = skills.filter(skill => profile?.lookingFor?.includes(skill.title));
    
        return { ...profile, skills: profileSkills, lookingFor: profileLookingFor };
      });

      setHydratedProfiles(hydratedProiles);
    }
  }, [ profiles, skills ]);

  return (
    <>
      {profile.visible ?
        (hydratedProfiles?.length ?
          <Deck data={hydratedProfiles} /> :
          <Container className="nav-bar-margin">
            <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
              Loading profiles...
            </div>
          </Container>
        ) :
        <Container className="nav-bar-margin">
          <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
            {isLoading ? `Loading...` :
              !profile.started ? 
                <>
                  Welcome! Let's get you set up. Head over to your <Link to="/profile/edit">profile page</Link> to get started.
                </> :
                !profile.completed ?
                  <>
                    Welcome back! Head over to your <Link to="/profile/edit">profile page</Link> to complete your profile and start searching for potential teammates!
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
