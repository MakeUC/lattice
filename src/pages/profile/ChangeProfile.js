import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SlackIcon from '@material-ui/icons/AlternateEmail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { Button, Container } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import "../../styles/Form.scss"
import { AssignmentTurnedIn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <Container className={classes.root + " nav-bar-margin"}>
      <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
        <h1 className="title">Your Profile</h1>
        <div className={classes.margin + " font-opensans"}>
          <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
            <Grid className="lattice-icon" item>
              <MailOutlineIcon />
            </Grid>
            <p className="lattice-form-label mb0 font-gray">Email Address</p>
            <Grid item className="lattice-form-input">
              <TextField id="input-with-icon-grid" fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
            <Grid item className="lattice-icon">
              <SlackIcon />
            </Grid>
            <p className="lattice-form-label mb0 font-gray">Username</p>
            <div className="lattice-form-note">Please provide your Slack username</div>
            <Grid item className="lattice-form-input">
              <TextField id="input-with-icon-grid" fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
            <Grid item className="lattice-icon">
              <KeyboardArrowRightIcon />
            </Grid>
            <p className="lattice-form-label mb0 font-gray">Project Idea</p>
            <Grid item className="lattice-form-input">
              <TextField id="input-with-icon-grid" fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
            <Grid className="lattice-icon" item>
              <AssignmentTurnedIn />
            </Grid>
            <p className="lattice-form-label mb0 font-gray">Providing</p>
            <div className="lattice-form-note">Please select only 6. Anymore would be ignored</div>
            <Grid item className="lattice-form-input">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={allSkills} // TODO: Need to be taken from DB ideally
                getOptionLabel={(option) => option.title}
                defaultValue={[allSkills[3]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label=""
                    placeholder="Skills"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
            <Grid className="lattice-icon" item>
              <AssignmentTurnedIn />
            </Grid>
            <p className="lattice-form-label mb0 font-gray">Looking For</p>
            <div className="lattice-form-note">Please select only 3. Anymore would be ignored</div>
            <Grid item className="lattice-form-input">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={allSkills} // TODO: Need to be taken from DB ideally
                getOptionLabel={(option) => option.title}
                defaultValue={[allSkills[3]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label=""
                    placeholder="Skills"
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" className="center" color="primary">Sign Up</Button>
      </div>
    </Container>
  );
}

const allSkills = [
  { title: 'Java' },
  { title: 'C++' },
  { title: 'HTML' },
  { title: 'CSS' },
  { title: 'Node' },
  { title: 'Python' },
];