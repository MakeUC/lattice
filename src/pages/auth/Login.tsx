import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { Button, Box } from '@material-ui/core';
import Container from "@material-ui/core/Container";

import { useAuth } from '../../providers/AuthProvider';
import useDialogControl from '../../components/DialogControl.hook';
import Spinner from '../../components/Spinner';
import ResetRequest from './dialogs/reset-request';
import ResetRequestAlert from './dialogs/reset-request-alert';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();
  const { token, login, sendResetLink } = useAuth();
  const resetRequestDialog = useDialogControl();
  const resetRequestAlertDialog = useDialogControl();

  const [ errors, setErrors ] = useState({});
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ failedToSubmit, setFailedToSubmit ] = useState(null);
  const [ redirect, setRedirect ] = useState(``);
  
  useEffect(() => {token && setRedirect(`/`)}, [ token ]);

  const onSubmit = async e => {
    try {
      e.preventDefault();
      setSubmitting(true);
      setErrors({});

      const email = e.target.email.value;
      const password = e.target.password.value;

      if(!email) {
        return setErrors({ email: `Please provide an email` });
      }

      if(!password) {
        return setErrors({ password: `Please provide a password` });
      }

      await login(email, password);
    } catch(err) {
      setFailedToSubmit(err);
    } finally {
      setSubmitting(false);
    }
  };

  const requestReset = async ({ email }) => {
    try {
      await sendResetLink(email);
    } catch(err) {
      resetRequestAlertDialog.setState(err);
    } finally {
      resetRequestDialog.dismiss();
      resetRequestAlertDialog.open();
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
          <h1 className="title">Lattice Log In</h1>
          <div className="font-opensans tc mb3">
            <p className="mb4">
              Discover and connect with MakeUC 2020 hackers from across the world!
            </p>
            <Box color="error.main" textAlign="center">{failedToSubmit && failedToSubmit.message}</Box>
            <div className={classes.margin}>
              <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                <Grid className="lattice-icon" item>
                  <MailOutlineIcon />
                </Grid>
                <p className="lattice-form-label mb0 font-gray">Email Address</p>
                <Grid item className="lattice-form-input">
                  <TextField name="email" type="email" id="input-with-icon-grid" fullWidth variant="outlined" />
                    {errors.email &&
                      <Box color="error.main">{errors.email}</Box>
                    }
                </Grid>
              </Grid>
              <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                <Grid item className="lattice-icon">
                  <PassOutlinedIcon />
                </Grid>
                <p className="lattice-form-label mb0 font-gray">Password</p>
                <Grid item className="lattice-form-input">
                  <TextField name="password" type="password" id="input-with-icon-grid" fullWidth variant="outlined" />
                    {errors.password &&
                      <Box color="error.main">{errors.password}</Box>
                    }
                </Grid>
              </Grid>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="center"
              color="primary"
              disabled={isSubmitting}
            >
              {
                isSubmitting ? <Spinner size="25px" /> : `Sign In`
              }
            </Button>
            <Box m={1} />
            <Button
              type="button"
              variant="contained"
              className="center"
              color="primary"
              onClick={resetRequestDialog.open}
            >Forgot Password</Button>
            <Box className="mt4">Don't have an account? Contact us at <a href="mailto:info@makeuc.io">info@makeuc.io</a> for an invite link</Box>
          </div>
        </div>
      </form>
      <ResetRequest
        show={resetRequestDialog.show}
        onClose={resetRequestDialog.dismiss}
        onSuccess={requestReset}
      />
      <ResetRequestAlert
        show={resetRequestAlertDialog.show}
        onClose={resetRequestAlertDialog.dismiss}
        error={resetRequestAlertDialog.state}
      />
      {redirect && <Redirect to={redirect} />}
    </Container>
  );
}
