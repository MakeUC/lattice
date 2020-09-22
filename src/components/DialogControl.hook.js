import { useState } from 'react';

export default function(defaultShow = false) {
  const [ show, setShow ] = useState(defaultShow);
  const [ state, setState ] = useState(null);
  
  const open = () => setShow(true);
  const dismiss = () => {
    setState(null);
    setShow(false);
  };

  return { show, open, dismiss, state, setState };
};