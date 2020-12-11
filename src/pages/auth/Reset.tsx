import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Button, Container, Box } from '@material-ui/core';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { useAuth } from '../../providers/AuthProvider';
import Spinner from '../../components/Spinner';
import useDialogControl from '../../components/DialogControl.hook';
import ResetAlert from './dialogs/reset-alert';

export default function () {
  const { resetToken } = useParams();
  const { getResetInfo, resetPassword } = useAuth();
  const resetAlertDialog = useDialogControl();

  const [ isLoading, setLoading ] = useState(true);
  const [ failedToLoad, setFailedToLoad ] = useState(null);
  const [ email, setEmail ] = useState(``);
  const [ errors, setErrors ] = useState({});
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ failedToSubmit, setFailedToSubmit ] = useState(null);
  const [ redirect, setRedirect ] = useState();

  const onSubmit = async e => {
    try {
      e.preventDefault();
      setSubmitting(true);
      setErrors({});

      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (!email) {
        return setErrors({ email: `Invalid email, please check the link provided` });
      }

      if (!password) {
        return setErrors({ password: `Please provide a password` });
      }

      if (password.length < 6) {
        return setErrors({ password: `Password must be atleast 6 characters long` });
      }

      if (password !== confirmPassword) {
        return setErrors({ confirmPassword: `Passwords don't match` });
      }

      await resetPassword(resetToken, password);
    } catch (err) {
      setFailedToSubmit(err);
    } finally {
      setSubmitting(false);
      resetAlertDialog.open();
    }
  };

  const done = () => {
    resetAlertDialog.dismiss();
    setRedirect(`/auth/login`);
  };

  useEffect(() => {
    (async function () {
      try {
        const email = await getResetInfo(resetToken);
        setEmail(email);
      } catch (err) {
        setFailedToLoad(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ getResetInfo, resetToken ]);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
        {isLoading ? <h1 className="title">Loading...</h1> :
          failedToLoad ?
            <Box color="error.main" textAlign="center">
              <h3>{failedToLoad.message}</h3>
            </Box> :
            <>
              <h1 className="title">Reset Password</h1>
              <Box color="error.main" textAlign="center">{failedToSubmit && failedToSubmit.message}</Box>
              <div className="mb4">
                <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                  <Grid className="lattice-icon" item>
                    <MailOutlineIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">Email Address</p>
                  <Grid item className="lattice-form-input">
                    <TextField name="email" type="email" fullWidth variant="outlined" value={email} disabled={true} />
                  </Grid>
                </Grid>
                <Grid container spacing={4} className="lattice-form-band" alignItems="flex-end">
                  <Grid item className="lattice-icon">
                    <PassOutlinedIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">New Password</p>
                  <Grid item className="lattice-form-input">
                    <TextField name="password" type="password" fullWidth variant="outlined" />
                    {errors.password &&
                      <Box color="error.main">{errors.password}</Box>
                    }
                  </Grid>
                </Grid>
                <Grid container spacing={4} className="lattice-form-band" alignItems="flex-end">
                  <Grid item className="lattice-icon">
                    <PassOutlinedIcon />
                  </Grid>
                  <p className="lattice-form-label mb0 font-gray">Confirm New Password</p>
                  <Grid item className="lattice-form-input">
                    <TextField name="confirmPassword" type="password" fullWidth variant="outlined" />
                    {errors.confirmPassword &&
                      <Box color="error.main">{errors.confirmPassword}</Box>
                    }
                  </Grid>
                </Grid>
                <Button
                  type="submit" 
                  variant="contained"
                  className="center" 
                  color="primary"
                  disabled={isSubmitting}
                >
                  {
                    isSubmitting ? <Spinner size="25px" /> : `Submit`
                  }
                </Button>
              </div>
            </>
        }
        </div>
      </form>
      <ResetAlert
        show={resetAlertDialog.show}
        onClose={done}
      />
      {redirect && <Redirect to={redirect} />}
    </Container>
  );
}
