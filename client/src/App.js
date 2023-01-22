import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/UserPanel';
import Lists from './components/Lists';

const router = createBrowserRouter([
    { path: 'login', element: <Login/> },
    { path: 'register', element: <Register/> },
    {
        path: '/',
        element: <ProtectedRoute protection={user => !!user} redirectPath='/login'/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Root/>,
                children: [
                    { path: 'lists', element: <Lists/>},
                    { path: 'me', element: <UserPanel/>},
                ]
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;