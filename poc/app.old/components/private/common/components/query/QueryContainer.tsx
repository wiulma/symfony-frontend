import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ConnectionSelector } from "./ConnectionSelector";
import { QueryDiagram } from "./QueryDiagram";
import {ContentHeader} from '../../../../content-header/ContentHeader';

export interface QueryContainerDataState {
    idConnection: number;
}

export class QueryContainer extends React.PureComponent<RouteComponentProps<{}>, QueryContainerDataState> {

    constructor(props: any) {
        super(props);
        this.state = { idConnection: 0 };
    }

    render() {
        return (
            <React.Fragment>
                <div className="row w-100 m-0 w-100 flex-column flex-nowrap list-container">
                    <ContentHeader title="Connections List"></ContentHeader>
                    <ConnectionSelector onConnect={this.onConnect.bind(this)}></ConnectionSelector>
                    <QueryDiagram idConnection={this.state.idConnection}></QueryDiagram>
                </div>
            </React.Fragment>
        );
    }

    private onConnect(sid: number) {
        this.setState({ idConnection: sid });
    }

}

