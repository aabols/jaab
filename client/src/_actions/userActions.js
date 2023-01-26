import { userConstants } from "../_constants/userConstants";
import { userServices } from '../_services/userServices';

export const userActions = {
    register: (user) => dispatch => {
        dispatch({ type: userConstants.REGISTER_REQUEST });
        userServices.register(user)
            .then(response => dispatch({
                type: userConstants.REGISTER_SUCCESS,
                payload: response.email
            }))
            .catch(response => dispatch({
                type: userConstants.REGISTER_FAILURE,
                payload: response
            }));
    },
    
    login: (user) => dispatch => {
        dispatch({ type: userConstants.LOGIN_REQUEST });
        userServices.login(user)
            .then(response => dispatch({
                type: userConstants.LOGIN_SUCCESS,
                payload: response
            }))
            .catch(response => dispatch({
                type: userConstants.LOGIN_FAILURE,
                payload: response
            }));
    },

    deleteAccount: () => dispatch => {
        dispatch({ type: userConstants.ACCOUNT_DELETE_REQUEST });
        userServices.deleteAccount()
            .then(response => dispatch({
                type: userConstants.ACCOUNT_DELETE_SUCCESS
            }))
            .catch(response => dispatch({
                type: userConstants.ACCOUNT_DELETE_FAILURE
            }));
    },

    logout: () => dispatch => {
        userServices.logout();
        dispatch({ type: userConstants.LOGOUT_SUCCESS });
    }
};