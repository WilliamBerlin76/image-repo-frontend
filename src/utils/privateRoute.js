  
import * as React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
                    return <Component {...props} />;
                }
                return <Redirect to="/login" />;
            }}
        />
    );
};

export default PrivateRoute; 