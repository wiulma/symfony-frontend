import React,{useState} from 'react';
// import {RouteComponentProps} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// import { login } from './LoginService';
// import {default as notificationService} from '../notification/NotificationService';

import './_styles.scss';

/*
interface LoginStateData {
    passwordView : number;
}

interface PasswordLayout {
    type: string,
    icon: IconDefinition
}
*/
export default function() {

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
/*
    constructor(props: any) {  
        super(props);
        this.state = {
            passwordView: 0
        }
    }
*/
    const [passwordView, setPasswordView] = useState(0);

    /*
        
    private togglePwd() {
        this.setState({ passwordView: Number(this.state.passwordView == 0)});
    }
*/
    const handleLogin = (evt) => {
        evt.preventDefault();
        alert('login');
        /*
        login(new FormData(evt.target))
            .then( (data)=> {
                this.props.history.push('/private', {user: data})
            })
            .catch ((exc) => {
                console.error(exc);
                notificationService.error({
                    title: 'Login error',
                    message: 'Credenziali non valide'
                });
            });
            */
    }

    const handlePwd = () => {
        setPasswordView(passwordView ? 0 : 1);
    }

    return (
        <div className="card col-12 col-xs-9 col-md-6 col-xl-4 mx-auto login">
            <h5 className="card-header bg-primary">Login</h5>
            <div className="card-body">
                <form onSubmit={() => handleLogin} >  
                    <div className="form-group">
                        <label htmlFor="username" className="bmd-label-floating">Username</label>
                        <input type="text" className="form-control" name="username" id="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="bmd-label-floating">Password</label>
                        <div className="input-group col-sm-12 icon">
                            <input type={pwdLayout[passwordView].type} className="form-control" name="password" id="password"/>
                            <span onClick={handlePwd}><FontAwesomeIcon icon={pwdLayout[passwordView].icon} size="2x"/></span>
                        </div>           
                    </div>
                    <button type="submit" className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );

}

