import { settingsConstants } from "../../_constants/settingsConstants";
import { themeConstants } from "../../_constants/themeConstants";

export const settingsActions = {
    setRefreshDelay: (delay) => dispatch => {
        localStorage.setItem(
            settingsConstants.LOCAL_STORAGE_KEY_REFRESH_DELAY,
            delay
        );
        return dispatch({
            type: settingsConstants.SET_REFRESH_RATE,
            delay
        });
    },

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
