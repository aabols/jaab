import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'janis@abols.com',
        password: 'password'
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setToken(data.token);
    })
    .catch((error) => {
      setToken('There was an error');
    })
  }, []);

  return (
    <div>{token}</div>
  );
};