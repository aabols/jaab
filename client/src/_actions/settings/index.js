import { themeConstants } from "../../_constants/themeConstants";

export const settingsActions = {
    setDarkTheme: () => dispatch => {
        localStorage.setItem(
            themeConstants.LOCAL_STORAGE_KEY,
            themeConstants.DARK_THEME_CLASSNAME
        );
        return dispatch({
            type: themeConstants.SELECT_THEME_DARK
        });
    },

    setLightTheme: () => dispatch => {
        localStorage.setItem(
            themeConstants.LOCAL_STORAGE_KEY,
            themeConstants.LIGHT_THEME_CLASSNAME
        );
        return dispatch({
            type: themeConstants.SELECT_THEME_LIGHT
        });
    },
};
