import { useCallback, useEffect, useState } from "react";
import { listsServices } from "../_services/listsServices";

export default function useListUsers(listId) {
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = useCallback(() => {
        const newController = new AbortController();
        listsServices.getUsers(listId, { signal: newController.signal })
            .then(({ data: users }) => {
                setListUsers(users);
                setLoading(false);
            })
            .catch(err => { });

        return () => {
            newController.abort();
        };
    }, [listId]);

    useEffect(() => {
        setListUsers([]);
        const abort = getUsers();
        return abort;
    }, [getUsers]);

    return [listUsers, getUsers, loading];
};
