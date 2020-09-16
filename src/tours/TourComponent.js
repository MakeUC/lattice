import React, { useState } from 'react'
import Tour from 'reactour'
import { useProfile } from '../providers/ProfileProvider';

export default function({ name, steps }) {
  const { profile, completeTour } = useProfile();
  const [ isOpen, setOpen ] = useState(true);

  const onTourComplete = async () => {
    setOpen(false);
    await completeTour(name);
  };

  return profile.completedTours?.includes(name) ? null :
    <Tour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={onTourComplete}
    />
};
