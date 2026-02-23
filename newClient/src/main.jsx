import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-bs-theme', darkPreference ? 'dark' : 'light');

const Component1 = React.lazy(() => import('./component1'));
import Component2 from './component2';

const router = createBrowserRouter([
    { path: '', element: <div>Blank</div> },
    { path: 'path1', element: <Suspense><Component1 /></Suspense> },
    { path: 'path2', element: <Component2 /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div>
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
);