import React from 'react';
import { NavLink } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import '../styles/Navigation.css';

export default function() {
  return (
    <BottomNavigation className="bottomNavigation" >
      <NavLink to="/notifications" icon={<NotificationsIcon />} component={BottomNavigationAction} />
      <NavLink to="/" icon={<HomeIcon />} component={BottomNavigationAction} />
      <NavLink to="/profile" icon={<PersonIcon />} component={BottomNavigationAction} />
    </BottomNavigation>
  );
}
