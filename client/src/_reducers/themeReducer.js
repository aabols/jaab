import { themeConstants } from "../_constants/themeConstants";

const defaultTheme = ['#a861a6', '#fff'];
const initialState = {
    selectedTheme: defaultTheme,
    themes: {
        Default: defaultTheme
    }
};

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case themeConstants.SELECT_THEME:
            return {
                ...state,
                selectedTheme: state.themes[action.payload]
            };
        default:
            return state;
    }
};