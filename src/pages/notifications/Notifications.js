import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const action = (
    <>
        <Button color="secondary" size="small">
            Remove
        </Button>
        <Button color="secondary" size="small">
            View
        </Button>
        <Button color="secondary" size="small">
            Send Message
        </Button>
    </>
);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LongTextSnackbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SnackbarContent message="Slack Username" action={action} />
    </div>
  );
}
