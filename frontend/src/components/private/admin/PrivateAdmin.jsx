import React, {useState} from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import CommonNavMenu from './../common/components/NavMenu';
import AdminNavMenu from './/components/NavMenu';
import Home from './components/Home';

/*
import { UserList } from './components/user/UserList';
import { UserDetail } from './components/user/UserDetail';
*/

import "../common/styles/_main.scss";


// class PrivateAdmin extends React.Component<RouteComponentProps<{}>, RootComponentState> {

export default (props) => {
    /*

    


                        <Route path='/private/users' component={UserList} />
                    <Route exact path='/private/user' component={UserDetail} />
                    <Route path='/private/user/:userid' component={UserDetail} />
                    <Route path='/private/connections' component={ConnectionList} />
                    <Route path='/private/connection/:connectionid?' component={ConnectionDetail} />
                    <Route path='/private/query' component={QueryContainer} />
    */

    return (
        <React.Fragment>
            <div class="row flex-grow-1 wrapper'">
                <CommonNavMenu {...{component: AdminNavMenu}}></CommonNavMenu>
            </div>
            <div className="container d-flex flex-column main-container">
                <Switch>
                    <Route exact path='/private' component={Home} />
                </Switch>
            </div>
        </React.Fragment>
    );
}
