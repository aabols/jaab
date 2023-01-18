import { userConstants } from "../_constants/userConstants";

let jwt = localStorage.getItem(userConstants.JWT_LOCAL_STORAGE_KEY);

const initialState = {
    registering: false,
    registerError: false,
    registerMessage: '',
    loggingIn: false,
    loginError: false,
    loginMessage: '',
    jwt
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: true,
                registerError: false,
                registerMessage: ''
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                registerMessage: `${action.payload} has been registered`
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                registerError: true,
                registerMessage: action.payload
            };
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                loginError: false,
                loginMessage: ''
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                jwt: action.payload,
                loginMessage: 'Login successful'
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loginError: true,
                loginMessage: action.payload
            };
        default:
            return state;
    }
};

export {
    userReducer
};