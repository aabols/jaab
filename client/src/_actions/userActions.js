import { userConstants } from "../_constants/userConstants";
import { userServices } from '../_services/userServices';

const register = (user) => {
    return (dispatch) => {
        const handleSuccess = (response) => {
            console.log(response);
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
            .then(handleSuccess, handleError)
    };
};

export const userActions = {
    register
};