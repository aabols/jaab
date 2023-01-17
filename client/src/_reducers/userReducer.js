import { userConstants } from "../_constants/userConstants";

const initialState = {
    registering: false,
    error: false,
    message: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: true,
                error: false,
                message: ''
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                message: `${action.payload} has been registered!`
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                error: true,
                message: action.payload
            };
        default:
            return state;
    }
};

export {
    userReducer
};