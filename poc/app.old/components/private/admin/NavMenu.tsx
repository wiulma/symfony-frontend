import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faHome, faBars, faDatabase, faTh } from '@fortawesome/free-solid-svg-icons';

import "../common/styles/_navmenu.scss";

declare var $: any;

interface MenuProps {
    toggleMenu: (evt: React.MouseEvent<HTMLElement>) => void
}

export class NavMenu extends React.Component<MenuProps, {}> {

    public render() {
        return (
            <nav className='main-nav bg-light menu'>
                <div className='navbar-content'>
                    <div className='navbar-header'>
                        <button type="button" className="btn btn-secondary" onClick={this.props.toggleMenu}>
                            <FontAwesomeIcon icon={faBars} size="1x" />
                        </button>
                    </div>

                    <div className='navbar navbar-collapse'>
                        <ul className='navbar-nav flex-column'>
                            <li className="nav-item">
                                <NavLink to={ '/private' } exact className="nav-link">
                                    <FontAwesomeIcon icon={faHome} className="menu-icon"/>
                                    <span className="label">Home</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/private/users'} className="nav-link">
                                    <FontAwesomeIcon icon={faUserFriends} className="menu-icon"/>
                                    <span className="label">Users</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/private/connections'} className="nav-link">
                                    <FontAwesomeIcon icon={faDatabase} className="menu-icon"/>
                                    <span className="label">Connections</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/private/query'} className="nav-link">
                                    <FontAwesomeIcon icon={faTh} className="menu-icon"/>
                                    <span className="label">Report</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav> 
        );
    }
}
