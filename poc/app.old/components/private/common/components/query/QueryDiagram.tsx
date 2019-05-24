import * as React from "react";
import * as connectionService from '../../services/ConnectionService';
import { QueryStructureItem } from "./QueryStructureItem";
import {default as notificationService} from '../../../../notification/NotificationService';

// import './lib/jquery.connections';

import "./styles/_diagram.scss";

export interface QueryDiagramDataState {
    items: any;
    loading: boolean;
    selectedItems: any;
    query: any,
    dataResults: any
}

export interface QueryDiagramDataProps {
    idConnection: number
}

export class QueryDiagram extends React.PureComponent<QueryDiagramDataProps, QueryDiagramDataState> {

    fgRenderConnections: boolean;

    constructor(props: any) {
        super(props);
        this.fgRenderConnections = false;
        this.state = {
            loading: true,
            items: [],
            selectedItems: {},
            query: {},
            dataResults: {}
        }
        this.onChangeSelection = this.onChangeSelection.bind(this);
        this.executeQuery = this.executeQuery.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.updateConnections = this.updateConnections.bind(this);
    }

    componentDidUpdate(prevProps: any) {
        const cid = this.props.idConnection;
        if ( cid !== prevProps.idConnection) {

            if (cid === undefined) {
                this.setState({loading: false, items: [], selectedItems: {} });
                this.fgRenderConnections = false;
                document.removeEventListener('scroll', this.updateConnections)
            } else {
                connectionService.getConnectionStructure(cid)
                .then(data => {
                    this.setState({loading: false, items: data, selectedItems: {} });
                    // this.renderConnections();
                })
                .catch (exc => {
                    notificationService.error({
                        title: 'Errore di connessione ai dati',
                        message: exc.details
                    });
                })
            }
        }
    }

    updateConnections () {
        $('connection').connections('update');
    }

    onChangeSelection(
                    {table, col}: {table: string, col: ColumnStructure}, selected: boolean) {
        const query =  this.state.selectedItems;
        if (selected) {
            if (!query[table]) query[table] = {columns: []};
            query[table].columns = query[table].columns || [];
            query[table].columns.push({name: col.columnName});
        } else {
            query[table].columns = query[table].columns.filter((item: any) => item.name !== col.columnName);
            if (Object.keys(query[table].columns).length === 0) delete query[table];
            
        }
        this.setState({query});
    }

    executeQuery() {
        connectionService.executeQuery(this.props.idConnection, this.state.query)
            .then((data: any) => {
                this.setState({dataResults: data});
            })
    }

    render() {
        return this.state.loading
            ? null
            : this.renderStructureItems(this.state.items);
    }

    renderResults() {
        if (this.state.dataResults && this.state.dataResults.length) {
            const r = this.state.dataResults;
            const rows: any[] = [];
            let headers: any[] = [];
            const dataList = r.map((item: any, idx: number) => {
                if (idx === 0) {
                    headers = Object.keys(item).map(k => <th>{k.replace('#', '.')}</th>);
                }
                return <tr className="data-row">{Object.values(item).map(v => <td className="data-cell">{v}</td>)}</tr>
            })

            return (
                <table key="results" className="result-container">
                  <thead>
                    <tr className="headers-row">{headers}</tr>
                  </thead>
                  <tbody>{ dataList }</tbody>
                </table>
            );

        } else {
            return null;
        }
        
    }

    /*
    TODO: not working
    renderConnections() {
        
        if (!this.fgRenderConnections) {
            const data = this.state.items;
            const dk = Object.keys(data);
            if (dk.length) {
                dk.forEach(
                    (k) => {
                        const t = data[k];
                        if (t.connections && t.connections.length) {
                            t.connections.forEach((c: any) => {
                                const pk = c.primaryTableName+c.primaryTableColumn;
                                const fk = t.tableName+c.columnName;
                                console.log("connection from ", fk, "to", pk);
                                $().connections({ from: '#'+fk, to: '#'+pk });
                            });
                        }
                    }
                )
                document.addEventListener('scroll', this.updateConnections)
                
            }
            this.fgRenderConnections = true;
        }
    }
    */

    renderStructureItems(data: any) {
        const connection: any = {};
        const rows: any[] = [];
        const dk = Object.keys(data);
        if (dk.length) {
            dk.forEach(
                (k) => {
                    const t = data[k];
                    rows.push(<QueryStructureItem key={"table_"+k} data={t} onChange={this.onChangeSelection}/>);
                    /*if (t.connections && t.connections.length) {
                        t.connections.forEach((c: any) => {
                            let ck: string = [t.tableName, c.primaryTableName].sort().join('@@');
                            if (!connection[ck])
                                connection[ck] = true;
                        });
                    }*/
                }
            );
            const results = this.renderResults();
            return (
                <div key="queryDiagramContainer" className="container-fluid query-diagram-container">
                    <div key="diagramContainer" className="diagram-container">{rows}</div>
                    <button key="btnExecuteQuery" type="button" className="btn btn-default btn-execute" onClick={this.executeQuery}>Execute</button>
                    {results}
                </div>
            
            );
        } else {
            return this.props.idConnection ? <p>Structure not found</p> : null;
        }

    }

}

