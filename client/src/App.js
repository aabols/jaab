import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { classNames } from 'classnames';

import './App.css';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import Register from './components/user/Register';
import Login from './components/user/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/user/UserPanel';
import Lists from './components/lists/Lists';
import List from './components/lists/List';
import { useSelector } from 'react-redux';

const router = createBrowserRouter([
    { path: 'login', element: <Login/> },
    { path: 'register', element: <Register/> },
    {
        path: '',
        element: <ProtectedRoute protection={user => !!user} redirectPath='/login'/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <Root/>,
                children: [
                    {
                        path: 'lists',
                        element: <Lists/>,
                        children: [
                            {
                                path: ':listId',
                                element: <List/>,
                                errorElement: <ErrorPage/>
                            }
                        ]
                    },
                    { path: 'me', element: <UserPanel/> },
                ]
            },
        ]
    }
]);

function App() {
    const selectedTheme = useSelector(state => state.theme.selectedTheme);

    return (
        <div className={selectedTheme}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;