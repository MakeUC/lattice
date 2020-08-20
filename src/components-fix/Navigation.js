import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import "../styles/Navigation.css";

export default function BottomNavigationSimple() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={`bottomNavigation`}
    >
      <BottomNavigationAction icon={<NotificationsIcon />} />
      <BottomNavigationAction icon={<HomeIcon />} />
      <BottomNavigationAction icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
