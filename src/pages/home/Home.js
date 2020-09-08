import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

import { useProfile } from "../../providers/ProfileProvider";
import { useProfileList } from "../../providers/ProfileListProvider";
import Deck from "./Deck";

export default function () {
  const profileState = useProfile();
  const profileListState = useProfileList();

  const [ hydratedProfiles, setHydratedProfiles ] = useState();

  const { profile } = profileState;
  const { skills, profiles } = profileListState;

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
      <LoadingText />
      <SetupText />
      <ResetText />
      <ErrorText />

      {profile?.visible && !!hydratedProfiles?.length &&
        <Deck data={hydratedProfiles} />
      }
    </>
  );
}

function TextBox({ children }) {
  return <Container className="nav-bar-margin">
    <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
      {children}
    </div>
  </Container>;
}

function SetupText() {
  const { isLoading, profile } = useProfile();

  return (
    !isLoading ? (
      !profile.started ? 
      <TextBox>
        Welcome! Let's get you set up. Head over to your <Link to="/profile/edit">profile page</Link> to get started.
      </TextBox> :
  
      !profile.completed ?
      <TextBox>
        Welcome back! Head over to your <Link to="/profile/edit">profile page</Link> to complete your profile and start searching for potential teammates!
      </TextBox> :
  
      !profile.visible ?
      <TextBox>
        Welcome back! Mark your profile "visible" from your <Link to="/profile">profile page</Link> to start searching for potential teammates!
      </TextBox> : null
    ) : null
  );
};

function LoadingText() {
  const profileState = useProfile();
  const profileListState = useProfileList();

  return (
    profileState.isLoading ?
    <TextBox>
      Fetching your profile...
    </TextBox> :

    profileListState.isLoading ?
    <TextBox>
      Finding the best hackers for you...
    </TextBox> : null
  );
};

function ResetText() {
  const { isLoading, profiles } = useProfileList();

  return (
    (!isLoading && !profiles.length) ?
    <TextBox>
      <p>
        That's everybody! If you still haven't found your teammates, you can reset all your left swipes and start over.
      </p>
      <Button variant="contained" color="primary">Reset</Button>

      <p>
        Or if you have already found your teammates, you can mark your profile as not visible.
      </p>
      <Button variant="contained" color="primary">Mark not visible</Button>
    </TextBox> : null
  );
};

function ErrorText() {
  const profileState = useProfile();
  const profileListState = useProfileList();

  return (
    profileState.failedToLoad ?
    <TextBox>
      There was an error fetching your profile
      <Button variant="contained" color="primary">Retry</Button>
    </TextBox> :

    profileListState.failedToLoad ?
    <TextBox>
      There was an error fetching hackers
      <Button variant="contained" color="primary">Retry</Button>
    </TextBox> : null
  );
};
