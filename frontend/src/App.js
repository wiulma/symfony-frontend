import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default function App() {

  const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

  /*
        <NotificationAlert key="notification"></NotificationAlert>
      <ConfirmDialog key="confirm"></ConfirmDialog>
  */
  return (
    <React.Fragment>
      <BrowserRouter key="router" children={ Routes } basename={ baseUrl } />
    </React.Fragment>
  );
}
