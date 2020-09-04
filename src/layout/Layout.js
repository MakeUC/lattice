import React from 'react';
import Providers from './Providers';
import Routes from './Routes';

export default function() {
  return <>
    <Providers>
      <Routes />
    </Providers>
  </>;
}