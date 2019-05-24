import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

interface QueryStructureItemDataState {
    data: {
        tableName: string,
        connections: TableConnection[],
        columns: ColumnStructure[]
    }
}

interface QueryStructureItemDataProps {
    data: {
        tableName: string,
        connections: TableConnection[],
        columns: ColumnStructure[]
    },
    onChange: (data: {table: string, connections: any, col: ColumnStructure}, selected: boolean) => void
}

export class QueryStructureItem extends React.PureComponent<QueryStructureItemDataProps, QueryStructureItemDataState> {

    constructor(props: any) {
        super(props);
        this.state = { data: props.data };
    }

    onChange(col: ColumnStructure, evt: React.ChangeEvent<HTMLInputElement>) {
        console.log(evt.target.value, evt.target.checked);
        const sd = this.state.data;
        this.props.onChange({
            table: sd.tableName,
            connections: sd.connections,
            col: col
        }, evt.target.checked);
    }

    render() {
        const data = this.state.data;
        if (!data) return <p>No data</p>
        else {
            const listItems = data.columns.map(
                (col: ColumnStructure) => {
                    if (col.foreignKey === "true") {
                        debugger;
                    }
                    const pkicon = (col.primaryKey === "true") ?
                        <FontAwesomeIcon key={"pk-"+col.id} icon={faKey} size="1x" className="primary-key"/> : null;

                    let fkicon = null;
                    if (col.foreignKey === "true") {
                        const conn = data.connections.find(c => c.columnName === col.columnName);

                        fkicon = <React.Fragment>
                                    <FontAwesomeIcon key={"fk-"+col.id} icon={faArrowsAltH} size="1x"/> 
                                    <label>[{conn.primaryTableName}.{conn.primaryTableColumn}]</label>
                                </React.Fragment>
                    }

                    return (
                        <li key={col.id} id={data.tableName+col.columnName} className="diagram-item">
                            <input key={"data-"+col.id} type="checkbox" name={"chk-"+col.id} value={col.id} onChange={this.onChange.bind(this, col)} />
                            <label>{col.columnName}</label>
                            {pkicon}
                            {fkicon}
                        </li>
                    );
                }
            );
            return(
                <article key={"tbl_" + data.tableName} className="remote-table">
                    <header>{data.tableName}</header>
                    <ul>
                        {listItems}
                    </ul>
                </article>
            );
        }
    }

}

