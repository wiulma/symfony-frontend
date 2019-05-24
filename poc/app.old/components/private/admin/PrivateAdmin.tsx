import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Switch } from 'react-router-dom';

import { NavMenu } from './NavMenu';
import { Home } from './components/Home';
import { QueryContainer } from '../common/components/query/QueryContainer';
import { ConnectionList} from './components/connection/ConnectionList';
import {ConnectionDetail} from './components/connection/ConnectionDetail';
import { UserList } from './components/user/UserList';
import { UserDetail } from './components/user/UserDetail';

import "../common/styles/_main.scss";

interface RootComponentState {
    showHideSidenav: boolean
}

export default class PrivateAdmin extends React.Component<RouteComponentProps<{}>, RootComponentState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            showHideSidenav: true
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(evt: React.MouseEvent<HTMLElement>): void {
        evt.preventDefault();
        this.setState({ showHideSidenav: !this.state.showHideSidenav });
    }


    render() {
        return (
            <div className={'row flex-grow-1 wrapper' + (this.state.showHideSidenav ? '' : ' collapse')}>
                <NavMenu toggleMenu={this.toggleMenu}></NavMenu>
                <div className="content d-flex flex-column main-container">
                    <Switch>
                        <Route exact path='/private' component={Home} />
                        <Route path='/private/users' component={UserList} />
                        <Route exact path='/private/user' component={UserDetail} />
                        <Route path='/private/user/:userid' component={UserDetail} />
                        <Route path='/private/connections' component={ConnectionList} />
                        <Route path='/private/connection/:connectionid?' component={ConnectionDetail} />
                        <Route path='/private/query' component={QueryContainer} />
                    </Switch>
                </div>
            </div>
        );
    }
}
