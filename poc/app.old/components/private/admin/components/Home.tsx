import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { ContentHeader } from '../../../content-header/ContentHeader';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="row m-0 w-100 flex justify-content-start">
            <ContentHeader title="Welcome to ROW - Report on the Web"></ContentHeader>
        </div>;
    }
}
