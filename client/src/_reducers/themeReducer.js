import { themeConstants } from "../_constants/themeConstants";

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const themeSetting = localStorage.getItem(themeConstants.LOCAL_STORAGE_KEY);

const initialState = {
    selectedTheme: themeSetting || (prefersDarkTheme ? 'theme-dark' : 'theme-light'),
};

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case themeConstants.SELECT_THEME_LIGHT:
            return {
                ...state,
                selectedTheme: 'theme-light'
            };
        case themeConstants.SELECT_THEME_DARK:
            return {
                ...state,
                selectedTheme: 'theme-dark'
            };
        default:
            return state;
    }
};