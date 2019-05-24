import * as React from 'react';

import * as connectionService from '../../services/ConnectionService';

interface ConnectionSelectorDataState {
    idConnection?: number;
    connections: ConnectionData[];
    loading: boolean;
}

interface ConnectionSelectorProps {
    onConnect: (sid: number) => {}
}

export class ConnectionSelector extends React.PureComponent<ConnectionSelectorProps, ConnectionSelectorDataState> {

    connectionsList: ConnectionData[]
    private selectConnection: HTMLSelectElement;

    constructor(props: any) {
        super(props);
        this.connectionsList = [];
        this.state = {
            loading: true,
            connections: []
        };

        this.handleConnect = this.handleConnect.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    componentDidMount() {
        connectionService.getList()
            .then(data => {
                this.connectionsList = data;
                this.setState({ connections: data, loading: false });
            });
    }

    render() {
        let optionItems = this.state.connections.map(item =>
            <option key={item.idConnection} value={item.idConnection}>{item.name}</option>
        );
        return (
            <div className='container-fluid connector-selector'>
                <div className='row m-0'>
                    <form onSubmit={this.handleConnect}>
                        <select ref={s => this.selectConnection = s} name="connectionList" required>
                            <option key="">Select remote connection...</option>
                            {optionItems}
                        </select>
                        <button type="submit" className="btn btn-default">Connect</button>
                        <button className="btn" onClick={this.handleDisconnect}>Disconnect</button>
                    </form>
                </div>
            </div>
        );
    }

    // This will handle the submit form event.  
    private handleConnect(event: any) {
        event.preventDefault();
        const sid: number = Number.parseInt(((new FormData(event.target)).get('connectionList') as string));
        this.setState({ idConnection: sid });
        this.props.onConnect(sid);
    }

    // This will handle Cancel button click event.  
    private handleDisconnect(e: any) {
        this.selectConnection.selectedIndex = 0;
        this.setState({ idConnection: undefined });
        this.props.onConnect(undefined);
        e.preventDefault();
    }
}
