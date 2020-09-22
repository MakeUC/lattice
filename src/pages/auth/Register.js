import React, { useEffect, useState } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { Button, Container, Box } from '@material-ui/core';

import { useAuth } from '../../providers/AuthProvider';

import "../../styles/Form.scss"
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function () {
  const classes = useStyles();
  const { token, getRegistrantEmail, register } = useAuth();
  const { registrantId } = useParams();

  const [ isLoading, setLoading ] = useState(true);
  const [ failedToLoad, setFailedToLoad ] = useState(null);
  const [ email, setEmail ] = useState(``);
  const [ errors, setErrors ] = useState({});
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ failedToSubmit, setFailedToSubmit ] = useState(null);
  const [ redirect, setRedirect ] = useState(``);

  useEffect(() => {
    (async function () {
      try {
        const email = await getRegistrantEmail(registrantId);
        setEmail(email);
      } catch (err) {
        setFailedToLoad(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ getRegistrantEmail, registrantId ]);

  useEffect(() => { token && setRedirect(`/`) }, [token]);

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

      await register(registrantId, password);
    } catch (err) {
      setFailedToSubmit(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className={classes.root}>
      <form onSubmit={onSubmit}>
        <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
          {isLoading ? <h1 className="title">Loading...</h1> :
            failedToLoad ?
              <Box color="error.main" textAlign="center">
                <h3>{failedToLoad.message}</h3>
              </Box> :
              <>
                <h1 className="title">Create Account</h1>
                <Box color="error.main" textAlign="center">{failedToSubmit && failedToSubmit.message}</Box>
                <div className={classes.margin + " font-opensans"}>
                  <Grid container spacing={4} className="lattice-form-band" alignItems="flex-end">
                    <Grid className="lattice-icon" item>
                      <MailOutlineIcon />
                    </Grid>
                    <p className="lattice-form-label mb0 font-gray">Email Address</p>
                    <Grid item className="lattice-form-input">
                      <TextField name="email" type="email" id="input-with-icon-grid" fullWidth variant="outlined" value={email} disabled={true} />
                      {errors.email &&
                        <Box color="error.main">{errors.email}</Box>
                      }
                    </Grid>
                  </Grid>
                  <Grid container spacing={4} className="lattice-form-band" alignItems="flex-end">
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
                  <Grid container spacing={4} className="lattice-form-band" alignItems="flex-end">
                    <Grid item className="lattice-icon">
                      <PassOutlinedIcon />
                    </Grid>
                    <p className="lattice-form-label mb0 font-gray">Confirm Password</p>
                    <Grid item className="lattice-form-input">
                      <TextField name="confirmPassword" type="password" id="input-with-icon-grid" fullWidth variant="outlined" />
                      {errors.confirmPassword &&
                        <Box color="error.main">{errors.confirmPassword}</Box>
                      }
                    </Grid>
                  </Grid>
                  <input type="hidden" name="registrantId" value={registrantId} />
                  <Button
                    type="submit"
                    variant="contained"
                    className="center"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {
                      isSubmitting ? <Spinner size="25px" /> : `Sign Up`
                    }
                  </Button>
                  <Box className="mt4">Already registered? Log in <Link to="/auth/login">here</Link></Box>
                </div>
              </>
          }
        </div>
      </form>
      {redirect && <Redirect to={redirect} />}
    </Container>
  );
}
