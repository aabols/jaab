import { React, useEffect } from 'react';

export default (props) => {
    const addEventListener = () => {
        const callback = (event) => {
            props.onKeyDown(event)
        };
        document.addEventListener("keydown", callback, false);

        const removeEventListener = () => {
            document.removeEventListener("keydown", callback, false);
        };
        
        // remove event listener on unmount
        return removeEventListener;
    };

    // add event listener on mount
    useEffect(addEventListener, []);

    return null;
}