import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../login/Login';
import { AsyncPrivateLayout } from '../private/common/AsyncPrivateLayout';
import {PrivateRoute} from './PrivateRoute';

export const routes =
    <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/private' component={AsyncPrivateLayout} />
    </Switch>;
