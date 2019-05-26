import * as React from 'react';

import "../common/styles/_main.scss";


export default function() {
/*
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { showHideSidenav: true, user: this.props.location.state.user };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    public toggleMenu(evt: React.MouseEvent<HTMLElement>): void {
        evt.preventDefault();
        this.setState({showHideSidenav: !this.state.showHideSidenav});
    }

    doLogout() {
        this.setState({user: null});
        logout()
            .then (() => this.props.history.push('/'));
    }
*/
        return (
            <div className="container-fluid min-100 d-flex flex-column h-100 p-0">
                Hello viewer!
            </div>
        );
}