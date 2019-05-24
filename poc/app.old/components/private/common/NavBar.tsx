import * as React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { ChangePasswordDialog } from './../common/components/change-password/ChangePasswordDialog';


import "./styles/_navbar.scss";

interface NavBarProps {
    logout: (evt: React.MouseEvent<HTMLElement>) => void,
    user: UserLoginResponseData
}

interface NavBarState {
    showChangePassword: boolean
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {

    constructor(props: NavBarProps) {
        super(props);
        this.editProfile = this.editProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.onCloseChangePassword = this.onCloseChangePassword.bind(this);
        this.state = {
            showChangePassword: false
        }
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
    }

    doLogout(evt: React.MouseEvent<HTMLElement>) {
        evt.preventDefault();
        evt.stopPropagation();
        setTimeout(this.props.logout, 200);
    }

    private onCloseChangePassword() {
        this.setState({ showChangePassword: false });
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand sticky-top bg-primary flex-md-nowrap justify-content-end topnav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown account">
                            <a className="nav-link dropdown-toggle" id="dropdownMenuButton" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faUser} size="1x" />
                                <span className="label">{this.props.user ? `${this.props.user.name} ${this.props.user.surname}` : ``}</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a href="#" onClick={this.changePassword} className="nav-link">
                                    Cambio Password
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="#" onClick={this.doLogout} className="nav-link">
                                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                                <span className="label">Logout</span>
                            </a>
                        </li>

                    </ul>
                </nav>
                <ChangePasswordDialog show={this.state.showChangePassword} user={this.props.user || {}} onClose={this.onCloseChangePassword}></ChangePasswordDialog>
            </React.Fragment>
        );
    }

    editProfile(evt: React.MouseEvent<HTMLElement>) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log("edit profile");
    }

    changePassword(evt: React.MouseEvent<HTMLElement>) {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({
            showChangePassword: true
        });
    }

}