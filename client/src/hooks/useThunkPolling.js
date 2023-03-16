import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export default function useThunkPolling(thunkCreator = (abortSignal) => (dispatch) => new Promise(), delay = 1000) {
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    const controllerRef = useRef(null);

    useEffect(() => {
        controllerRef.current = new AbortController();
        const thunk = thunkCreator(controllerRef.current.signal);
        const repeat = () => {
            timerRef.current = setTimeout(() => {
                dispatch(thunk).then(repeat);
            }, delay);
        };

        if (thunk) dispatch(thunk).then(repeat);

        return () => {
            clearTimeout(timerRef.current);
            controllerRef.current.abort();
        };
    }, [delay, dispatch, thunkCreator]);
};
