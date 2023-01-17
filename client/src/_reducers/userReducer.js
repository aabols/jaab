import { userConstants } from "../_constants/userConstants";

let jwt = localStorage.getItem(userConstants.JWT_LOCAL_STORAGE_KEY);

const initialState = {
    registering: false,
    loggingIn: false,
    error: false,
    message: '',
    jwt
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
                message: `${action.payload} has been registered`
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                error: true,
                message: action.payload
            };
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                error: false,
                message: ''
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                jwt: action.payload,
                message: 'Login successful'
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
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