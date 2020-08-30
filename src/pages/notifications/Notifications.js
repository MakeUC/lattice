import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LaunchIcon from '@material-ui/icons/Launch';
import Container from "@material-ui/core/Container";

const action = (
    <Button className="font-secondary-dark" size="small">
        <LaunchIcon className="font-secondary-dark"/>
    </Button>
);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    snackbar: {
        backgroundColor: '#8174ff',
        fontFamily: 'Open Sans'
    }
}));

export default function LongTextSnackbar() {
    const classes = useStyles();

    return (
        <Container className={classes.root + " nav-bar-margin"}>
            <div className="pa4">
                <SnackbarContent className={classes.snackbar} message="You matched with {{ user.name }}" action={action}/>
            </div>
        </Container>
    );
}
