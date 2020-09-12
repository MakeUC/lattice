import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LaunchIcon from '@material-ui/icons/Launch';
import Container from "@material-ui/core/Container";

import { useNotification } from '../../providers/NotificationProvider';
import useDialogControl from '../../components/DialogControl.hook';
import NotificationDetailsDialog from './dialogs/notification-details';

const action = (
  <Button className="font-secondary-dark" size="small">
    <LaunchIcon className="font-secondary-dark" />
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

export default function() {
  const classes = useStyles();
  const { isLoading, failedToLoad, notifications, getNotifications, readNotifications } = useNotification();
  const dialogControl = useDialogControl();
  
  const [ openNotification, setOpenNotification ] = useState(null);

  useEffect(() => { readNotifications() }, [ readNotifications ]);

  const openNotificationDetails = notification => {
    setOpenNotification(notification);
    dialogControl.open();
  };

  return (
    <Container className={classes.root + " nav-bar-margin"}>
      {
        isLoading ?
          <TextBox>Fetching notifications...</TextBox> :

        failedToLoad ? 
          <TextBox>
            <p>Error fetching notifications</p>
            <Button variant="contained" color="primary" onClick={getNotifications}>Try again</Button>
          </TextBox> :

          <div className="pa4">
            {notifications.map(notification =>
              <SnackbarContent
                className={classes.snackbar}
                message={`You matched with ${notification.to.name}`}
                action={action}
                onClick={() => openNotificationDetails(notification)}
              />
            )}
          </div>
      }
      <NotificationDetailsDialog
        show={dialogControl.show}
        onClose={dialogControl.dismiss}
        matchedUser={openNotification?.to}
      />
    </Container>
  );
};

function TextBox({ children }) {
  return <Container className="nav-bar-margin">
    <div className="bg-white mv3 mv5-ns pa3 ph5-ns br3">
      {children}
    </div>
  </Container>;
};
