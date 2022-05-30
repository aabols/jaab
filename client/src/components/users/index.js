import { React, useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    useEffect(
        () => {
            fetch('http://localhost:3001/api/user')
                .then(res => res.json())
                .then(u => setUsers(u));
        },
        []
    );
    return (
        <div>
            {users.length}
        </div>
    )
}
