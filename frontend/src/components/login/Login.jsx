import React, {useState} from 'react';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { login } from './LoginService';
import notificationService from '../notification/NotificationService';

import './_styles.scss';

export default withRouter(function(props) {

    const pwdLayout = [
        {
            type: "password",
            icon: faEye
        },
        {
            type: "text",
            icon: faEyeSlash
        }
    ];

    const [passwordView, setPasswordView] = useState(0);

    const handleLogin = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        login(new FormData(evt.target))
            .then( (data)=> {
                props.history.push('/private', {user: data})
            })
            .catch (exc => {
                console.error(exc);
                notificationService.error({
                    title: 'Login error',
                    message: 'Credenziali non valide'
                });
            });
    }

    return (
        <div className="card col-12 col-xs-9 col-md-6 col-xl-4 mx-auto login">
            <h5 className="card-header bg-primary">Login</h5>
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username" className="bmd-label-floating">Username</label>
                        <input type="text" className="form-control" name="username" id="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="bmd-label-floating">Password</label>
                        <div className="input-group col-sm-12 icon">
                            <input type={pwdLayout[passwordView].type} className="form-control" name="password" id="password"/>
                            <span onClick={() => setPasswordView(passwordView ? 0 : 1)}><FontAwesomeIcon icon={pwdLayout[passwordView].icon} size="2x"/></span>
                        </div>           
                    </div>
                    <button type="submit" className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );

});

