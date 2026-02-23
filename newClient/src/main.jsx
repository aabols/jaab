import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-bs-theme', darkPreference ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div>Hello World</div>
    </React.StrictMode>
);