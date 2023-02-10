import { userConstants } from "../_constants/userConstants";
import { userServices } from '../_services/userServices';

export const userActions = {
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