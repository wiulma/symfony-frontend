import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {default as notificationService} from '../../../../notification/NotificationService';
import {setProfile} from '../../../common/services/ProfileService';

interface UserProfileData {
    userData?: UserData;
    show: boolean;
    messages: Array<ViewMessage>
}

interface UserDataProps {
    user: any;
    show: boolean;
    onClose: () => void;
}

export class SecurityDialog extends React.PureComponent<UserDataProps, UserProfileData> {

    private dialog: HTMLDivElement;
    private changePasswordPanel: HTMLDivElement;
    private formEl: HTMLFormElement;

    constructor(props: any) {
        super(props);

        this.state = {
            show: this.props.show,
            messages: [],
            userData: {idUser: 0}
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleCheckRepeatPassword = this.handleCheckRepeatPassword.bind(this);
    }

    componentDidMount() {
        this.setState({userData: this.props.user});

        $(this.dialog).on('hidden.bs.modal',
            () => {
                this.handleCancel();
            });

        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
    }

    componentDidUpdate(prevProps: UserDataProps) {
        if (this.props.show != prevProps.show) {
            this.setState({userData: this.props.user});
            $(this.dialog).modal(this.props.show ? 'show' : 'hide');
        }
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
    }

    private cleanChangePassword() {

        this.formEl.reset();
        this.formEl['changePassword'].checked = false;
        const cl = this.changePasswordPanel.classList;
        if (cl.contains('show')) {
            cl.remove('show');
            cl.add('hide');
        }
    }

    private handleCheckRepeatPassword(event: React.ChangeEvent<HTMLInputElement>) {
        const input: HTMLInputElement = event.target;
        this.checkRepeatPassword(input);
    }

    private checkRepeatPassword(input: HTMLInputElement) {
        const n = input.parentElement.getElementsByTagName("div")[0];
        if (input.value !== this.formEl["password"].value) {
            input.setCustomValidity('Password Must be Matching.');
            n.textContent = 'Password Must be Matching.';
            n.classList.add("d-block");
            return false;
        } else {
            n.classList.remove("d-block");
            input.setCustomValidity('');
            return true;
        }
    }

    handleCancel() {
        this.props.onClose();
        this.cleanChangePassword();
    }

    private checkData() {
        this.formEl.classList.add('was-validated');
        const cv =  this.formEl.checkValidity();
        if (cv) {
            if (this.formEl['changePassword'].checked) {
                if (this.checkRepeatPassword(this.formEl["repeatPassword"]) && 
                    this.formEl["oldPassword"] !== '') {
                        return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({messages: []});
        this.formEl.classList.remove('was-validated');
        if (this.checkData()) {
            setProfile(new FormData(this.formEl))
                .then(result => {
                    this.props.onClose();
                    notificationService.success({
                        title: 'Save profile',
                        message: 'Profile saved successfully'
                    });
                })
                .catch( error => {
                    const {message} = error;
                    this.setState({messages: [{style: 'alert-danger', text: message}]});
                })
        }
    }

    handleChangePassword(evt: React.FormEvent<EventTarget>) {
        const target = evt.target as HTMLInputElement;
        const elm = this.formEl['changePassword'];
        const targetId = target.getAttribute("data-target");
        if(elm.checked) {
            $(`#${targetId}`).collapse("show");
        } else {
            $(`#${targetId}`).collapse("hide");
            this.cleanChangePassword();
        }
    }

    private getMessages(): Array<ViewMessage> {
        return this.state.messages || [];
    }

    render() {
        const messages: Array<ViewMessage> = this.getMessages();
        return (
            <div ref={f => this.dialog = f} className="modal fade modal-form" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Security Details</h4>
                        </div>

                        <div className="modal-body">
                            <form ref={f => this.formEl = f} className="d-flex flex-column flex-grow-1" noValidate>
                                <div className="card">
                                    <div className="card-body">
                                        <input type="hidden" name="idUser" value={this.state.userData.idUser || ''} />

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
                                                defaultValue={this.state.userData.username || ''} required />
                                            <div className="invalid-feedback">Please provide a valid username.</div>
                                        </div>

                                        <div className="card spacing-top">
                                            <div className="card-header" id="headingOne">
                                                <div className="mb-0 form-check">
                                                    <input type="checkbox" className="form-check-input" name="changePassword" id="changePassword"
                                                        data-target="collapsePassword" aria-label="Checkbox for change password" onChange={this.handleChangePassword} />
                                                    <label className="form-check-label" htmlFor="changePassword">Change Password</label>
                                                </div>
                                            </div>

                                            <div ref={f => this.changePasswordPanel = f} id="collapsePassword" className="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="oldPassword" className="bmd-label-floating">Old Password</label>
                                                        <input type="text" className="form-control" id="oldPassword" name="oldPassword" />
                                                        <div className="invalid-feedback">Please provide a valid password.</div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password" className="bmd-label-floating">Password</label>
                                                        <input type="text" className="form-control" name="password" id="password" />
                                                        <div className="invalid-feedback">Please provide a valid password.</div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="repeatPassword" className="bmd-label-floating">Repeat Password</label>
                                                        <input type="text" className="form-control" id="repeatPassword"
                                                             onChange={this.handleCheckRepeatPassword} />
                                                        <div className="invalid-feedback">Please provide a valid password.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-container">
                                            {messages.map((msg, idx) => <p className={msg.style} key={idx}>{msg.text}</p>)}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-raised btn-primary" onClick={this.handleSave}>Save</button>
                                        <button type="button" className="btn btn-raised btn-secondary" onClick={this.handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}