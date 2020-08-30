import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SlackIcon from '@material-ui/icons/AlternateEmail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Button, Container} from '@material-ui/core';

import '../../styles/Profile.scss'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
}));


export default function InputWithIcon() {
    const classes = useStyles();

    return (
        <Container className="nav-bar-margin">
            <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
                <h1 className="title">Lattice Account</h1>
                <div className="mb4">
                    <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                        <Grid className="lattice-icon" item>
                            <MailOutlineIcon/>
                        </Grid>
                        <p className="lattice-form-label mb0 font-gray">user@makeuc.io</p>
                    </Grid>
                    <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                        <Grid item className="lattice-icon">
                            <SlackIcon/>
                        </Grid>
                        <p className="lattice-form-label mb0 font-gray">MakeUC</p>
                    </Grid>
                </div>
                <Button variant="contained" className="center profile-button" color="primary">Change Username</Button>
                <Button variant="contained" className="center profile-button" color="primary">Change Password</Button>
            </div>
        </Container>
    );
}
