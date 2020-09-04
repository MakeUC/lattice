import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import SlackIcon from '@material-ui/icons/AlternateEmail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Button, Container } from '@material-ui/core';

import '../../styles/Profile.scss'
import { useAuth } from '../../providers/AuthProvider';
import { useProfile } from '../../providers/ProfileProvider';
import PromiseButton from '../../components/PromiseButton';
import { Redirect } from 'react-router-dom';

export default function() {
  const { logout } = useAuth();
  const { isLoading, profile, toggleVisibility } = useProfile();

  const [ redirect, setRedirect ] = useState();

  const redirectToProfileForm = () => setRedirect(`/your_profile`);

  return (
    <Container className="nav-bar-margin">
      <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
        <h1 className="title">Lattice Account</h1>
          {isLoading ? `Loading...` :
            <>
              <div className="mb4">
                <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                  <Grid className="lattice-icon" item>
                    <PersonIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">{profile?.name}</p>
                </Grid>
                <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                  <Grid className="lattice-icon" item>
                    <MailOutlineIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">{profile?.email}</p>
                </Grid>
                <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                  <Grid item className="lattice-icon">
                    <SlackIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">{profile?.slack}</p>
                </Grid>
              </div>

              <Button
                variant="contained"
                className="center profile-button"
                color="primary"
                onClick={redirectToProfileForm}
              >Edit Profile</Button>

              <PromiseButton
                variant="contained"
                className="center profile-button"
                color="primary"
                onClick={toggleVisibility}
              >
                {profile.visible ?
                  <>
                    <VisibilityIcon /> &nbsp; Mark Not Visible
                  </> :
                  <>
                    <VisibilityOffIcon /> &nbsp; Mark Visible
                  </>
                }
              </PromiseButton>

              <Button
                variant="contained"
                className="center profile-button"
                color="primary"
              >Change Password</Button>

              <PromiseButton
                variant="contained"
                className="center profile-button"
                color="primary"
                onClick={logout}
              >Logout</PromiseButton>
            </>
          }
          {redirect && <Redirect to={redirect} />}
      </div>
    </Container>
  );
}
