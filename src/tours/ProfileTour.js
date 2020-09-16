import React from 'react'
import TourComponent from './TourComponent';

export default function() {
  return <TourComponent name="profile" steps={steps} />;
}

const steps = [
  {
    selector: '',
    content: `Welcome to your Lattice profile page. This is the place where you control your profile, settings and visibility on Lattice.`
  },
  {
    selector: '.edit-profile-button',
    content: `You can hit this button to edit your profile.`
  },
  {
    selector: '.toggle-visibility-button',
    content: `From here you can control your visibility on Lattice. When you are done looking for teammates, you can mark your profile as not visibile so that you stop receiving matches.`
  },
  {
    selector: '.home-link',
    content: `When you are satisfied with your settings, you can go back to the home page and start matching with hackers.`
  }
];
