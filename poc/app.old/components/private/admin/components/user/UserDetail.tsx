import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { ContentHeader } from '../../../../content-header/ContentHeader';
import { DataNotFoundView } from '../../../../data-not-found/View';
import { default as notificationService } from './../../../../notification/NotificationService';
import * as userService from './UserService';
import './styles/_details.scss';



interface UserDetailDataState {
    title: string;
    loading: boolean;
    userData: UserData;
    passwordType: string
}

export class UserDetail extends React.Component<RouteComponentProps<UserDetailRouteParams>, UserDetailDataState> {

    private userid: number;

    private formEl: HTMLFormElement;

    constructor(props: RouteComponentProps<UserDetailRouteParams>) {
        super(props);

        this.userid = parseInt(this.props.match.params["userid"]);

        this.state = (this.userid && this.userid > 0) ?
            {
                title: "User Details",
                loading: true,
                passwordType: "password",
                userData: {
                    idUser: (this.userid || 0)
                }
            }
            :
            {
                title: "Create", loading: false, passwordType: "password", userData: { idUser: (this.userid || 0) }
            };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.togglePwd = this.togglePwd.bind(this);
        this.checkRepeatPassword = this.checkRepeatPassword.bind(this);
    }

    componentDidMount() {
        console.log('bootstrapMaterialDesign');
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
        // const userid: number = this.props.match.params["userid"];
        // This will set state for Edit User  
        if (this.userid && this.userid > 0) {
            userService.get(this.userid)
                .then(data => {
                    this.setState({ loading: false, userData: data });
                })
                .catch(error => {
                    this.setState({ loading: false, userData: null });
                });
        }
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : (this.state.userData ? this.renderDataForm() : <DataNotFoundView />);

        return <div className="main-content">
            <ContentHeader title={this.state.title} />
            {contents}
        </div>;
    }

    private checkRepeatPassword(event: React.ChangeEvent<HTMLInputElement>) {
        const input: HTMLInputElement = event.target;
        const n = input.parentElement.getElementsByTagName("div")[0];
        if (input.value !== this.formEl["password"].value) {
            input.setCustomValidity('Password Must be Matching.');
            n.textContent = 'Password Must be Matching.';
            n.classList.add("d-block");
        } else {
            n.classList.remove("d-block");
            input.setCustomValidity('');
        }
    }

    // This will handle the submit form event.  
    private handleSave(event: any) {
        this.formEl.classList.remove('was-validated');
        event.preventDefault();
        event.stopPropagation();

        if (this.checkData()) {
            userService.save(new FormData(this.formEl))
                .then(() => {
                    notificationService.success({
                        title: 'Save user',
                        message: 'User saved successfully'
                    });
                    this.props.history.push("/private/users");
                })
                .catch((error: FetchError) => {
                    const { details, message } = error;
                    notificationService.error({
                        title: 'Save user error',
                        message,
                        details
                    });
                });
        }
    }

    private checkData() {
        this.formEl.classList.add('was-validated');
        return this.formEl.checkValidity();
    }

    // This will handle Cancel button click event.  
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/private/users");
    }

    private togglePwd() {
        const s = this.state.passwordType == "password" ? "text" : "password";
        this.setState({ passwordType: s });
    }

    componentDidUpdate() {
        $(this.formEl).bootstrapMaterialDesign();
    }


    private getSecurityPanel() {
        if (!this.state.userData.idUser) {
            return (
                <React.Fragment>
                    <div className="card-header">Security</div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="role" className="bmd-label-floating upper">Role</label>
                            <select className="custom-select" data-val="true" name="role"
                                defaultValue={this.state.userData.role} required>
                                <option value="A">Admin</option>
                                <option value="U">User</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="bmd-label-floating">Username</label>
                            <input type="text" className="form-control" name="username" id="username"
                                defaultValue={this.state.userData.username} required />
                            <div className="invalid-feedback">Please provide a valid username.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="bmd-label-floating">Password</label>
                            <input type="text" className="form-control" name="password" id="password"
                                defaultValue={this.state.userData.password} required />
                            <div className="invalid-feedback">Please provide a valid password.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword" className="bmd-label-floating">Repeat Password</label>
                            <input type="text" className="form-control" id="repeatPassword"
                                defaultValue={this.state.userData.password} onChange={this.checkRepeatPassword} required />
                            <div className="invalid-feedback">Please provide a valid password.</div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="card-header">Security</div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="role" className="bmd-label-floating upper">Role</label>
                            <select className="custom-select" data-val="true" name="role"
                                defaultValue={this.state.userData.role} required>
                                <option value="A">Admin</option>
                                <option value="U">User</option>
                            </select>
                        </div>
                    </div>
                </React.Fragment >
            );
        }
    }

    // Returns the HTML Form to the render() method.
    private renderDataForm() {
        let securityContent = this.getSecurityPanel();

        return (
            <div className="row d-flex flex-grow-1 detail-container item-details">

                <form ref={f => this.formEl = f} onSubmit={this.handleSave} className="d-flex flex-column flex-grow-1" noValidate>
                    <div className="card">
                        <div className="card-header">
                            <span>Details</span>
                        </div>
                        <div className="card-body">
                            <input type="hidden" name="idUser" value={this.state.userData.idUser} />
                            <div className="form-group">
                                <label htmlFor="name" className="bmd-label-floating">Name</label>
                                <input type="text" className="form-control" name="name" id="name" defaultValue={this.state.userData.name} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname" className="bmd-label-floating">Surname</label>
                                <input type="text" className="form-control" name="surname" id="surname" defaultValue={this.state.userData.surname} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="bmd-label-floating">Email</label>
                                <input type="email" className="form-control" name="email" id="email" defaultValue={this.state.userData.email} required />
                                <div className="invalid-feedback">Please provide a valid email.</div>
                            </div>
                        </div>
                        {securityContent}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-raised btn-primary" onClick={this.handleSave}>Save</button>
                            <button type="button" className="btn btn-raised btn-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}  