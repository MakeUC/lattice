import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LaunchIcon from '@material-ui/icons/Launch';

const action = (
  <Button color="secondary" size="small">
      <LaunchIcon />
  </Button>
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
      <SnackbarContent message="You matched with {{ user.name }}" action={action} />
    </div>
  );
}
