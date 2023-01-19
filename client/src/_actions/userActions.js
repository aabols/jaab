import { userConstants } from "../_constants/userConstants";
import { userServices } from '../_services/userServices';

const register = (user) => {
    return (dispatch) => {
        const handleSuccess = (response) => {
            dispatch({
                type: userConstants.REGISTER_SUCCESS,
                payload: response.email
            });
        };
        const handleError = (response) => {
            dispatch({
                type: userConstants.REGISTER_FAILURE,
                payload: response
            });
        };
        dispatch({ type: userConstants.REGISTER_REQUEST });
        userServices.register(user)
            .then(handleSuccess, handleError);
    };
};

const login = (user) => {
    return (dispatch) => {
        const handleSuccess = (response) => {
            dispatch({
                type: userConstants.LOGIN_SUCCESS,
                payload: response
            });
        };
        const handleError = (response) => {
            dispatch({
                type: userConstants.LOGIN_FAILURE,
                payload: response
            });
        };
        dispatch({ type: userConstants.LOGIN_REQUEST });
        userServices.login(user)
            .then(handleSuccess, handleError);
    };
};

const logout = () => {
    return (dispatch) => {
        userServices.logout();
        dispatch({ type: userConstants.LOGOUT_SUCCESS });
    };
};

export const userActions = {
    register,
    login,
    logout
};