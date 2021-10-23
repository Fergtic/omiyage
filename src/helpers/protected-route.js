import PropTypes from 'prop-types';
import {Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'


export default function ProtectedRoute({user, children, ...rest}){
    return(
        <Route
        {...rest}
        render={({location}) => {
            if (user) {
                return children
            }else{
                return(
                    <Redirect
                    to={{
                        pathname: ROUTES.SIGN_UP,
                        state: {from: location}
                    }}/>
                )
            }
            return null;

        }}/>
    )
}


ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
}