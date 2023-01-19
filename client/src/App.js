import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import ErrorPage from './components/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './components/Root';
import Register from './components/Register';
import Login from './components/Login';

const AdminPage = React.lazy(() => import('./components/AdminPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            { path: 'login', element: <Login/> },
            { path: 'myregister', element: <Register/> },
            {
                path: 'admin',
                element: <ProtectedRoute protection={user => !!user} redirectPath='/login'/>,
                children: [
                    { path: 'page', element: <Suspense fallback={<>Loading...</>}><AdminPage/></Suspense> },
                    { path: 'center', element: <>Hello Center</> }
                ]
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;