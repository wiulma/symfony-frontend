import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { default as storage } from './services/StorageFactory';
import LoaderComponent from './components/loader/LoaderComponent';

export default withRouter(function(props) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect( () => {
        debugger;
        console.log("useEffect");
        storage.get("user")
            .then(user => {
                const pl = props.location
                pl.state = pl.state || {};
                pl.state.user = user;
                setUser(user);
                setLoading(false);
                
            });

    }, [user, loading]);


    if (loading) {
        const loadingProps = {
            isLoading: true,
            pastDelay: true,
            timedOut: true,
            error: "",
            retry: () => {}
        }
        return <LoaderComponent {...loadingProps}></LoaderComponent>
    } else {
        
        const {component: Component, ...rest} = props;
        const renderComponent = (props) => (
            (user) ? <Component {...props} /> : <Redirect to='/' />
        );

        return <Route {...rest} render={renderComponent} />
    }

});