import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { ContentHeader } from '../../../../content-header/ContentHeader';
import { DataNotFoundView } from '../../../../data-not-found/View';
import { default as notificationService } from '../../../../notification/NotificationService';
import * as connectionService from '../../../common/services/ConnectionService';

interface ConnectionDetailDataState {
    title: string;
    loading: boolean;
    connectionData: ConnectionData;
}

export class ConnectionDetail extends React.Component<RouteComponentProps<ConnectionDetailRouteParams>, ConnectionDetailDataState> {

    private connectionid: number;

    private formEl: HTMLFormElement;

    constructor(props: RouteComponentProps<ConnectionDetailRouteParams>) {
        super(props);

        this.connectionid = parseInt(this.props.match.params["connectionid"]);

        this.state = (this.connectionid && this.connectionid > 0) ?
            {
                title: "Connection Details",
                loading: true,
                connectionData: {
                    idConnection: (this.connectionid || 0)
                }
            }
            :
            {
                title: "Create", loading: false, connectionData: { idConnection: (this.connectionid || 0) }
            };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTestConn = this.handleTestConn.bind(this);
    }

    componentDidMount() {
        console.log('bootstrapMaterialDesign');
        $(ReactDOM.findDOMNode(this)).bootstrapMaterialDesign();
        // const connectionid: number = this.props.match.params["connectionid"];
        // This will set state for Edit Connection  
        if (this.connectionid && this.connectionid > 0) {
            connectionService.get(this.connectionid)
                .then(data => {
                    this.setState({ loading: false, connectionData: data });
                })
                .catch(error => {
                    this.setState({ loading: false, connectionData: null });
                });
        }
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : (this.state.connectionData ? this.renderDataForm() : <DataNotFoundView />);

        return <div className="main-content">
            <ContentHeader title={this.state.title} />
            {contents}
        </div>;
    }

    private handleTestConn(event: any) {
        event.preventDefault();
        event.stopPropagation();
        const cs = this.formEl['connString'].value;
        const type = this.formEl['type'].value;
        if ( cs!= '') {
            connectionService.testConnection(type, cs)
                .then( (result: boolean) => {
                    notificationService.success({
                        title: 'Test connection',
                        message: 'Connection tested successfully'
                    });
                })
                .catch((error: FetchError) => {
                    const { details, message } = error;
                    notificationService.error({
                        title: 'Test connection error',
                        message,
                        details
                    });
                })
        } else {

        }
        

    }

    // This will handle the submit form event.  
    private handleSave(event: any) {
        this.formEl.classList.remove('was-validated');
        event.preventDefault();
        event.stopPropagation();

        if (this.checkData()) {
            connectionService.save(new FormData(this.formEl))
                .then(() => {
                    notificationService.success({
                        title: 'Save connection',
                        message: 'Connection saved successfully'
                    });
                    this.props.history.push("/private/connections");
                })
                .catch((error: FetchError) => {
                    const { details, message } = error;
                    notificationService.error({
                        title: 'Save connection error',
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
        this.props.history.push("/private/connections");
    }

    componentDidUpdate() {
        $(this.formEl).bootstrapMaterialDesign();
    }

    // Returns the HTML Form to the render() method.
    private renderDataForm() {
        return (
            <div className="row d-flex flex-grow-1 detail-container item-details">

                <form ref={f => this.formEl = f} onSubmit={this.handleSave} className="d-flex flex-column flex-grow-1" noValidate>
                    <div className="card">
                        <div className="card-header">
                            <span>Details</span>
                        </div>
                        <div className="card-body">
                            <input type="hidden" name="idConnection" value={this.state.connectionData.idConnection} />
                            <div className="form-group">
                                <label htmlFor="name" className="bmd-label-floating">Name</label>
                                <input type="text" className="form-control" name="name" id="name" defaultValue={this.state.connectionData.name} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type" className="bmd-label-floating upper">Type</label>
                                <select className="custom-select" data-val="true" name="type"
                                    defaultValue={this.state.connectionData.type} required>
                                    <option value="mysql">MySql</option>
                                    <option value="sqlserver">SqlServer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname" className="bmd-label-floating">Connection String</label>
                                <input type="text" className="form-control" name="connString" id="connString" defaultValue={this.state.connectionData.connString} required />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-raised btn-primary" onClick={this.handleSave}>Save</button>
                            <button type="button" className="btn btn-raised btn-primary" onClick={this.handleTestConn}>Test connection</button>
                            <button type="button" className="btn btn-raised btn-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}  