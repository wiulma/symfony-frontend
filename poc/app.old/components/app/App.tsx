import { hot } from 'react-hot-loader'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './Routes';
import { NotificationAlert } from '../notification/Notification';
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog';
import { default as Storage }  from '../../services/StorageFactory';

class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
    // needed in order to create storage instance
    (Storage)
  }

  render() {
    const routes = RoutesModule.routes;

    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
  
    return (
      <React.Fragment>
        <BrowserRouter key="router" children={ routes } basename={ baseUrl } />
        <NotificationAlert key="notification"></NotificationAlert>
        <ConfirmDialog key="confirm"></ConfirmDialog>
      </React.Fragment>
    );
  }
}

export default hot(module)(App)