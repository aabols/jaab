import { v4 as uuid } from 'uuid';

import { listsConstants } from "../_constants/listsConstants";
import { listsServices } from "../_services/listsServices";

export const listsActions = {
    refreshAll: () => dispatch => {
        dispatch({ type: listsConstants.REFRESH_ALL_REQUEST });
        listsServices.refreshAll()
            .then(res => dispatch({
                    type: listsConstants.REFRESH_ALL_SUCCESS,
                    payload: res.data
            }))
            .catch(res => dispatch({
                    type: listsConstants.REFRESH_ALL_FAILURE
            }));
    },

    createList: (list) => dispatch => {
        const temporaryId = uuid();
        dispatch({
            type: listsConstants.CREATE_LIST_REQUEST,
            payload: {...list, id: temporaryId}
        });
        listsServices.createList(list)
            .then(res => dispatch({
                    type: listsConstants.CREATE_LIST_SUCCESS,
                    payload: {temporaryId, list: res.data}
            }))
            .catch(res => dispatch({
                type: listsConstants.CREATE_LIST_FAILURE,
                payload: temporaryId
            }));
    }
};