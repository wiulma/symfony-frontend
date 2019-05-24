import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { default as storage } from '../../services/StorageFactory';
import {LoadingComponent} from '../loader/LoaderComponent';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export class PrivateRoute extends Route<PrivateRouteProps> {

    loading?: boolean = true;

    componentDidMount() {
        this.loading = true;
        storage.get("user")
            .then(user => {
                this.loading = false;
                const pl = this.props.location
                pl.state = pl.state || {};
                pl.state.user = user;
                this.setState({
                    user
                });
            });
    }

    render() {
        if (this.loading) {
            const loadingProps = {
                isLoading: true,
                pastDelay: true,
                timedOut: true,
                error: "",
                retry: () => {}
            }
            return <LoadingComponent {...loadingProps}></LoadingComponent>
        } else {
            const {component: Component, ...rest}: PrivateRouteProps = this.props;
            const renderComponent: RenderComponent = (props) => (
                (this.state.user) ? <Component {...props} /> : <Redirect to='/' />
            );

            return <Route {...rest} render={renderComponent} />
        }

    }
}