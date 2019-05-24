import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faPlus, faKey } from '@fortawesome/free-solid-svg-icons';

import {ContentHeader} from '../../../../content-header/ContentHeader';

import * as connectionService from '../../../common/services/ConnectionService';
import {default as confirmService} from '../../../../confirm-dialog/ConfirmService';
import {default as notificationService} from '../../../../notification/NotificationService';

interface ConnectionListDataState {
    connectionList: ConnectionData[];
    loading: boolean;
    selectedConnection: ConnectionData | {};
}

export class ConnectionList extends React.Component<RouteComponentProps<{}>, ConnectionListDataState> {
    constructor(props: any) {
        super(props);
        this.state = { connectionList: [], loading: true, selectedConnection: null };
        this.createConnection = this.createConnection.bind(this);
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
        connectionService.getList()
            .then(data => {
                this.setState({ connectionList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderConnectionsTable(this.state.connectionList);

        return (
            <React.Fragment>
                <div className="row w-100 m-0 w-100 flex-column flex-nowrap list-container">
                    <ContentHeader title="Connections List"></ContentHeader>
                    <div className="row m-0 d-flex justify-content-end nav-actions">
                        <button className="btn btn-info bmd-btn-fab" onClick={this.createConnection}>
                            <FontAwesomeIcon icon={faPlus} className="act"/>
                        </button>
                    </div>
                    {contents}
                </div>
            </React.Fragment>
        );
    }

    private createConnection() {
        this.handleEdit();
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
        connectionService.doDelete(id!)
            .then(() => {
                notificationService.success({
                    title: 'Delete connection',
                    message: 'Connection deleted successfully'
                });
                this.setState(
                    {
                        connectionList: this.state.connectionList.filter((rec) => {
                            return (rec.idConnection!= id);
                        })
                    });
            })
            .catch (error => {
                const {details, message} = error;
                notificationService.error({
                    title: 'Delete connection error',
                    message,
                    details
                });

            })
    }

    private handleEdit(id?: number) {
        this.props.history.push(`connection/${id || ""}`);
    }

    // Returns the HTML table to the render() method.  
    private renderConnectionsTable(connectionList: ConnectionData[]) {
        if (connectionList && connectionList.length) {
            return(
                <div className='list-data'>
                    <div className="row m-0 headers">
                        <div className="col-4">Nome</div>
                        <div className="col-6">Connection Type</div>
                        <div className="col-2"></div>
                    </div>
                    {connectionList.map(connection =>
                        <div className="row data" key={connection.idConnection}>
                            <div className="col-4">{connection.name}</div>
                            <div className="col-6">{connection.type}</div>
                            <div className="col-2 d-flex actions">
                                <button className="btn btn-raised btn-info bmd-btn-fab bmd-btn-fab-sm"  onClick={() => this.handleEdit(connection.idConnection)}>
                                    <FontAwesomeIcon icon={faEdit} className="act"/>
                                </button>
                                <button className="btn btn-info bmd-btn-fab bmd-btn-fab-sm" onClick={() => this.confirmDelete(connection.idConnection)}>
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

   