import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faPlus, faKey } from '@fortawesome/free-solid-svg-icons';

import {SecurityDialog} from './../security-dialog/SecurityDialog';
import {ContentHeader} from '../../../../content-header/ContentHeader';

import * as userService from './UserService';
import {default as confirmService} from '../../../../confirm-dialog/ConfirmService';
import {default as notificationService} from './../../../../notification/NotificationService';

interface UserListDataState {
    userList: UserData[];
    loading: boolean;
    showSecurity: boolean;
    selectedUser: UserData | {};
}

export class UserList extends React.Component<RouteComponentProps<{}>, UserListDataState> {
    constructor(props: any) {
        super(props);
        this.state = { userList: [], loading: true, showSecurity: false, selectedUser: null };
        this.createUser = this.createUser.bind(this);
        this.handleEditSecurity = this.handleEditSecurity.bind(this);
        this.onCloseSecurity = this.onCloseSecurity.bind(this);
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
        userService.getList()
            .then(data => {
                this.setState({ userList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUsersTable(this.state.userList);

        return (
            <React.Fragment>
                <div className="row w-100 m-0 w-100 flex-column flex-nowrap list-container">
                    <ContentHeader title="Users List"></ContentHeader>
                    <div className="row m-0 d-flex justify-content-end nav-actions">
                        <button className="btn btn-info bmd-btn-fab" onClick={this.createUser}>
                            <FontAwesomeIcon icon={faPlus} className="act"/>
                        </button>
                    </div>
                    {contents}
                </div>
                <SecurityDialog show={this.state.showSecurity} user={this.state.selectedUser || {}} onClose={this.onCloseSecurity}></SecurityDialog>
            </React.Fragment>
        );
    }

    private createUser() {
        this.handleEdit();
    }

    private onCloseSecurity() {
        this.setState({showSecurity: false, selectedUser: {}});
    }

    // Handle Delete request for an Users  
    private confirmDelete(id?: number) {
        confirmService.confirm({
            title: 'Confirm Delete',
            message: 'Do you really want to delete data?',
            onConfirm: this.handleDelete.bind(this, id)
        });

    }

    private handleDelete(id: number) {
        userService.doDelete(id!)
            .then(() => {
                notificationService.success({
                    title: 'Delete user',
                    message: 'User deleted successfully'
                });
                this.setState(
                    {
                        userList: this.state.userList.filter((rec) => {
                            return (rec.idUser != id);
                        })
                    });
            })
            .catch (error => {
                const {details, message} = error;
                notificationService.error({
                    title: 'Delete user error',
                    message,
                    details
                });

            })
    }

    private handleEditSecurity(user: UserData) {
        this.setState({showSecurity: true, selectedUser: user});
    }

    private handleEdit(id?: number) {
        this.props.history.push(`user/${id || ""}`);
    }

    // Returns the HTML table to the render() method.  
    private renderUsersTable(userList: UserData[]) {
        if (userList && userList.length) {
            return(
                <div className='list-data'>
                    <div className="row m-0 headers">
                        <div className="col-3">Nome</div>
                        <div className="col-3">Cognome</div>
                        <div className="col-3">Mail</div>
                        <div className="col-1">Ruolo</div>
                        <div className="col-2"></div>
                    </div>
                    {userList.map(user =>
                        <div className="row data" key={user.idUser}>
                            <div className="col-3">{user.name}</div>
                            <div className="col-3">{user.surname}</div>
                            <div className="col-3">{user.email}</div>
                            <div className="col-1">{user.role}</div>
                            <div className="col-2 d-flex actions">
                            <button className="btn btn-raised btn-info bmd-btn-fab bmd-btn-fab-sm"  onClick={() => this.handleEditSecurity(user)}>
                                    <FontAwesomeIcon icon={faKey} className="act"/>
                                </button>
                                <button className="btn btn-raised btn-info bmd-btn-fab bmd-btn-fab-sm"  onClick={() => this.handleEdit(user.idUser)}>
                                    <FontAwesomeIcon icon={faEdit} className="act"/>
                                </button>
                                <button className="btn btn-info bmd-btn-fab bmd-btn-fab-sm" onClick={() => this.confirmDelete(user.idUser)}>
                                    <FontAwesomeIcon icon={faTrash} className="act"/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return <p><em>No Data</em></p>
        }

    }
}

   