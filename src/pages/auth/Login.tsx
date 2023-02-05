import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PassOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import { Button, Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../providers/AuthProvider";
import useDialogControl from "../../components/DialogControl.hook";
import Spinner from "../../components/Spinner";
import ResetRequest, { ResetRequestForm } from "./dialogs/reset-request";
import ResetRequestAlert from "./dialogs/reset-request-alert";
import { useForm } from "react-hook-form";
import { ParticleBackground } from "../../components/ParticleBackground";
import { loadFull } from "tsparticles";

interface LoginForm {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));



export default function InputWithIcon() {
  const classes = useStyles();
  const { login, sendResetLink } = useAuth();
  const resetRequestDialog = useDialogControl();
  const resetRequestAlertDialog = useDialogControl<Error | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [failedToSubmit, setFailedToSubmit] = useState<Error | unknown>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setSubmitting(true);
      await login(data.email, data.password);
    } catch (err) {
      setFailedToSubmit(err);
    } finally {
      setSubmitting(false);
    }
  };

  const requestReset = async ({ email }: ResetRequestForm) => {
    try {
      await sendResetLink(email);
    } catch (err) {
      if (err === undefined || err instanceof Error) {
        resetRequestAlertDialog.setState(err);
      }
    } finally {
      resetRequestDialog.dismiss();
      resetRequestAlertDialog.open();
    }
  };

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
  await console.log(container);
}, []);

  return (
    <Container>
      <ParticleBackground id="tsparticles" init={particlesInit} loaded={particlesLoaded}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3" style={{position:'relative'}}>
          <h1 className="title">Lattice Log In</h1>
          <div className="font-opensans tc mb3">
            <p className="mb4">
              Discover and connect with RevolutionUC 2022 hackers from across
              the world!
            </p>
            <Box color="error.main" textAlign="center">
              {failedToSubmit instanceof Error && failedToSubmit.message}
            </Box>
            <div className={classes.margin}>
              <Grid
                container
                spacing={4}
                className="mb3 lattice-form-band"
                alignItems="flex-end"
              >
                <Grid className="lattice-icon" item>
                  <MailOutlineIcon />
                </Grid>
                <p className="lattice-form-label mb0 font-gray">
                  Email Address
                </p>
                <Grid item className="lattice-form-input">
                  <TextField
                    name="email"
                    type="email"
                    id="input-with-icon-grid"
                    fullWidth
                    variant="outlined"
                    {...register("email", {
                      required: `Please provide an email`,
                    })}
                  />
                  {errors.email && (
                    <Box color="error.main">{errors.email.message}</Box>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                spacing={4}
                className="mb3 lattice-form-band"
                alignItems="flex-end"
              >
                <Grid item className="lattice-icon">
                  <PassOutlinedIcon />
                </Grid>
                <p className="lattice-form-label mb0 font-gray">Password</p>
                <Grid item className="lattice-form-input">
                  <TextField
                    name="password"
                    type="password"
                    id="input-with-icon-grid"
                    fullWidth
                    variant="outlined"
                    {...register("password", {
                      required: `Please provide an password`,
                    })}
                  />
                  {errors.password && (
                    <Box color="error.main">{errors.password.message}</Box>
                  )}
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
              {isSubmitting ? <Spinner size="25px" /> : `Sign In`}
            </Button>
            <Box m={1} />
            <Button
              type="button"
              variant="contained"
              className="center"
              color="primary"
              onClick={resetRequestDialog.open}
            >
              Forgot Password
            </Button>
            <Box className="mt4">
              Don't have an account? Contact us at{" "}
              <a href="mailto:info@revolutionuc.com">info@revolutionuc.com</a>{" "}
              for an invite link
            </Box>
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
    </Container>
  );
}
