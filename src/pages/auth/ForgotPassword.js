import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Button, Container} from '@material-ui/core';
/* 
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
})); */

export default function () {
    // const classes = useStyles();

    return (
        <Container>
            <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
                <h1 className="title">Reset Password</h1>
                <div className="mb4">
                    <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                        <Grid className="lattice-icon" item>
                            <MailOutlineIcon/>
                        </Grid>
                        <p className="lattice-form-label mb0 font-gray">Email Address</p>
                        <Grid item className="lattice-form-input">
                            <TextField id="input-with-icon-grid" fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Button variant="contained" className="center" color="primary">Send Reset Instructions</Button>
                </div>

            </div>
        </Container>
    );
}
