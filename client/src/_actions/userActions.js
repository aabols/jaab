import { userConstants } from "../_constants/userConstants";
import { userServices } from '../_services/userServices';

const register = (user) => {
    return (dispatch) => {
        const handleSuccess = (response) => {
            dispatch({ type: userConstants.REGISTER_SUCCESS });
        };
        const handleError = (response) => {
            dispatch({ type: userConstants.REGISTER_FAILURE });
        };
        dispatch({ type: userConstants.REGISTER_REQUEST });
        userServices.register(user)
            .then(handleSuccess, handleError)
    };
};

export const userActions = {
    register
};