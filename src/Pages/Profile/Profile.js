import React from "./node_modules/react";
import { makeStyles } from "./node_modules/@material-ui/core/styles";
import TextField from "./node_modules/@material-ui/core/TextField";
import Grid from "./node_modules/@material-ui/core/Grid";
import SlackIcon from "./node_modules/@material-ui/icons/AlternateEmail";
import MailOutlineIcon from "./node_modules/@material-ui/icons/MailOutline";
import { Button } from "./node_modules/@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <div>
      <h1>Lattice Account</h1>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <MailOutlineIcon />
          </Grid>
          <Grid item>
            <TextField
              disabled
              id="input-with-icon-grid"
              label="user@makeuc.io"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SlackIcon />
          </Grid>
          <Grid item>
            <TextField disabled id="input-with-icon-grid" label="username" />
          </Grid>
        </Grid>
      </div>
      <Button>Change Username</Button>
      <Button>Change Password</Button>
    </div>
  );
}
