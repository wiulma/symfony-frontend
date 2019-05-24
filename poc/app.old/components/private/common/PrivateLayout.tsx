import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import * as Loadable from 'react-loadable';

import { NavBar } from '../common/NavBar';
import { logout } from '../../login/LoginService';
import { LoadingComponent } from '../../loader/LoaderComponent';

import "../common/styles/_main.scss";

interface RootComponentState {
    showHideSidenav: boolean,
    user: UserLoginResponseData,
    component?: React.Component
}

export default class PrivateLayout extends React.PureComponent<RouteComponentProps<{}>, RootComponentState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);

        if (!this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('/');
            return;
        }

        this.state = {
            showHideSidenav: true,
            user: this.props.location.state.user
        };
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
    }

    doLogout() {
        this.setState({ user: null });
        logout()
            .then(() => {
                this.props.history.push('/')
            });
    }

    render() {
        if (!this.state.user) return null;

        let Component;
        if (this.state.user.role === "A") {
            Component = Loadable({
                loader: () => import("../admin/PrivateAdmin"),
                loading: LoadingComponent
            });
        } else {
            Component = Loadable({
                loader: () => import("../user/PrivateUser"),
                loading: LoadingComponent
            });
        }
        return (
            <div className="container-fluid min-100 d-flex flex-column h-100 p-0">
                <NavBar user={this.state.user} logout={this.doLogout.bind(this)}></NavBar>
                <Component {...this.props}></Component>
            </div>
        );
    }
}

