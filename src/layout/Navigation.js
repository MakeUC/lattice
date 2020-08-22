import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import '../styles/Navigation.css';

function NavAction({ navigate, ...rest }) {
  return <BottomNavigationAction {...rest} />;
}

export default function() {
  return <>
    <BottomNavigation className="bottomNavigation" >
      <Link to="/notifications">
        <NavAction icon={<NotificationsIcon />} />
      </Link>
      <Link to="/">
        <NavAction icon={<HomeIcon />} />
      </Link>
      <Link to="/profile">
        <NavAction icon={<PersonIcon />} />
      </Link>
    </BottomNavigation>
  </>;
}
