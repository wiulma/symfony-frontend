import * as React from 'react';
import ReactDOM from 'react-dom';

import {default as confirmService} from './ConfirmService';

interface ConfirmDataState {
    details?: ConfirmData
}

export class ConfirmDialog extends React.PureComponent<{}, ConfirmDataState> {

    private dialog: HTMLDivElement;

    constructor(props: any) {
        super(props);

        this.state = {};

        this.showConfirm = this.showConfirm.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        confirmService.subscribe("NotifyConfirm", this.showConfirm);

        $(this.dialog).on('hidden.bs.modal', 
            (event: Event) => {
                this.setState({details: null});
        });
    }

    componentWillUnmount() {
        confirmService.unsubscribe("NotifyConfirm", this.showConfirm);
    }

    showConfirm(details: ConfirmData) {
        this.setState({details});
        $(this.dialog).modal('show');
    }

    handleConfirm() {
        $(this.dialog).modal('hide');
        this.state.details.onConfirm();
    }

    handleCancel() {
        $(this.dialog).modal('hide');
    }

    render() {
        return (
            <div ref={f => this.dialog = f} className="modal fade" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.state.details ? this.state.details.title : ''}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{this.state.details ? this.state.details.message : ''}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleConfirm}>Confirm</button>
                        <button type="button" className="btn btn-secondary" onClick={this.handleCancel}>Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}