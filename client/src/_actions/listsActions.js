import { listsConstants } from "../_constants/listsConstants";
import { listsServices } from "../_services/listsServices";

export const listsActions = {
    refreshAll: () => dispatch => {
        dispatch({ type: listsConstants.REFRESH_ALL_REQUEST });
        listsServices.refreshAll()
            .then(res => {
                dispatch({
                    type: listsConstants.REFRESH_ALL_SUCCESS,
                    payload: res.data
                });
            })
            .catch(res => {
                dispatch({
                    type: listsConstants.REFRESH_ALL_FAILURE
                });
            })
    }
};