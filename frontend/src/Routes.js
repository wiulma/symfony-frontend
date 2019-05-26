import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/login/Login';
import { AsyncPrivateLayout } from './components/private/common/AsyncPrivateLayout';
import PrivateRoute from './PrivateRoute';


export default
    <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/private' component={AsyncPrivateLayout} />
    </Switch>;
