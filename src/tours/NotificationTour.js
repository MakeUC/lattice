import React from 'react'
import TourComponent from './TourComponent';

export default function() {
  return <TourComponent name="notification" steps={steps} />;
}

const steps = [
  {
    selector: '',
    content: `Congratulations on you first match! This is the profile of the hacker you matched with, which means that you both are interested in teaming up with each other.`
  },
  {
    selector: '.slack-button',
    content: `This is the username of this hacker on the MakeUC Slack workspace. You can use this to find and reach out to the hacker.`
  },
  {
    selector: '.email-button',
    content: `If for some reason you could not get in touch with the hacker on the MakeUC Slack, you can always try the old-fashioned email.`
  }
];
