import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/login/Login';
// import { AsyncPrivateLayout } from '../private/common/AsyncPrivateLayout';
// import {PrivateRoute} from './PrivateRoute';

// <PrivateRoute path='/private' component={AsyncPrivateLayout} />

export default
    <Switch>
        <Route exact path='/' component={Login} />
        
    </Switch>;
