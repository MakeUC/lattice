import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SlackIcon from '@material-ui/icons/AlternateEmail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { Button } from '@material-ui/core';

import SkillList from '../../components/SkillList';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <div>
      <h1>Create a Lattice Account</h1>
      <p>
        Register to discover and connect with MakeUC 2020 hackers from across
        the world!
      </p>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <MailOutlineIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Email Address" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SlackIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Slack Username" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PassOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Password" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PassOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Confirm Password" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <KeyboardArrowRightIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Project Idea" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SkillList />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SkillList />
          </Grid>
        </Grid>
      </div>
      <Button>Sign Up</Button>
    </div>
  );
}
