import React, {useState, useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import { withRouter } from "react-router";
import * as Loadable from 'react-loadable';
import $ from "jquery";

// import { NavBar } from '../common/NavBar';
import { logout } from '../../login/LoginService';
import LoaderComponent from '../../loader/LoaderComponent';

import "../common/styles/_main.scss";

export default withRouter(function(props) {

    if (!props.location.state || !props.location.state.user) {
        props.history.push('/');
        return;
    }

    const [user, setUser] = useState(props.location.state.user);

    useEffect(() => {
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
    }, []);

    const doLogout = () => {
        setUser(null);
        logout()
            .then(() => {
                props.history.push('/')
            });
    }

    if (!user) return null;

    let Component;
    if (user.role === "A") {
        Component = Loadable({
            loader: () => import("../admin/PrivateAdmin"),
            loading: LoaderComponent
        });
    } else {
        Component = Loadable({
            loader: () => import("../user/PrivateUser"),
            loading: LoaderComponent
        });
    }
    // <NavBar user={user} logout={doLogout}></NavBar>
    return (
        <div className="container-fluid min-100 d-flex flex-column h-100 p-0">
            <Component {...{component: Component, user}}></Component>
        </div>
    );

});