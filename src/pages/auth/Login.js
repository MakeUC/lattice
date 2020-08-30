import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PassOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import {Button} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import SlackIcon from "@material-ui/icons/AlternateEmail";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

export default function InputWithIcon() {
    const classes = useStyles();

    return (
        <Container>
            <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
                <h1 className="title">Lattice Log In</h1>
                <div className="font-opensans tc mb4">
                    <p className="mb4">
                        Discover and connect with MakeUC 2020 hackers from across the world!
                    </p>
                    <div className={classes.margin}>
                        <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                            <Grid className="lattice-icon" item>
                                <MailOutlineIcon/>
                            </Grid>
                            <p className="lattice-form-label mb0 font-gray">Email Address</p>
                            <Grid item className="lattice-form-input">
                                <TextField id="input-with-icon-grid" fullWidth variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} className="mb3 lattice-form-band" alignItems="flex-end">
                            <Grid item className="lattice-icon">
                                <PassOutlinedIcon/>
                            </Grid>
                            <p className="lattice-form-label mb0 font-gray">Password</p>
                            <Grid item className="lattice-form-input">
                                <TextField id="input-with-icon-grid" fullWidth variant="outlined"/>
                            </Grid>
                        </Grid>
                    </div>
                    <Button variant="contained" className="center" color="primary">
                        Sign In
                    </Button>
                </div>
            </div>
        </Container>
    );
}
