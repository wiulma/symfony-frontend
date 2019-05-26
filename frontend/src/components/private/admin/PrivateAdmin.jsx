import React, {useState} from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

/*
import { NavMenu } from './NavMenu';
*/

import Home from './components/Home';

/*
import { QueryContainer } from '../common/components/query/QueryContainer';
import { ConnectionList} from './components/connection/ConnectionList';
import {ConnectionDetail} from './components/connection/ConnectionDetail';
import { UserList } from './components/user/UserList';
import { UserDetail } from './components/user/UserDetail';
*/

import "../common/styles/_main.scss";


// class PrivateAdmin extends React.Component<RouteComponentProps<{}>, RootComponentState> {

export default function(props) {

    const [showHideSidenav, setShowHideSidenav] = useState(true);

    const toggleMenu = (evt) => {
        evt.preventDefault();
        setShowHideSidenav(!showHideSidenav);
    }
    /*

    <NavMenu toggleMenu={toggleMenu}></NavMenu>


                        <Route path='/private/users' component={UserList} />
                    <Route exact path='/private/user' component={UserDetail} />
                    <Route path='/private/user/:userid' component={UserDetail} />
                    <Route path='/private/connections' component={ConnectionList} />
                    <Route path='/private/connection/:connectionid?' component={ConnectionDetail} />
                    <Route path='/private/query' component={QueryContainer} />
    */

    return (
        <div className={'row flex-grow-1 wrapper' + (showHideSidenav ? '' : ' collapse')}>
            <div>NavMenu</div>
            <div className="content d-flex flex-column main-container">
                <Switch>
                    <Route exact path='/private' component={Home} />
                </Switch>
            </div>
        </div>
    );
}
