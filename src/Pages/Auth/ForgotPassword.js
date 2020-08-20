import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <div>
      <h1>Reset Password</h1>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <MailOutlineIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Email Address" />
          </Grid>
        </Grid>
      </div>
      <Button>Send Reset Instructions</Button>
    </div>
  );
}
