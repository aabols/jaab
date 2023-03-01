import { userConstants } from "../_constants/userConstants";

let user = JSON.parse(localStorage.getItem(userConstants.JWT_LOCAL_STORAGE_KEY));
let legacyUser = JSON.parse(localStorage.getItem(userConstants.JWT_LOCAL_STORAGE_KEY_LEGACY));

const initialState = {
    user,
    legacyUser,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};