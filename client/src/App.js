import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import classNames from 'classnames';
import './App.css';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import Register from './components/user/Register';
import Login from './components/user/Login';
//import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteLegacy from './components/ProtectedRouteLegacy';
import Lists from './components/lists/Lists';
import List from './components/lists/List';
import { useSelector } from 'react-redux';

const homepage = process.env.REACT_APP_HOMEPAGE;

const router = createBrowserRouter([
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    {
        path: '',
        //element: <ProtectedRoute protection={user => !!user} redirectPath='/login' />,
        element: <ProtectedRouteLegacy protection={(user, legacyUser) => !!user || !!legacyUser} redirectPath='/login' />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Root />,
                children: [
                    {
                        path: 'lists',
                        element: <Lists />,
                        children: [
                            {
                                path: ':listId',
                                element: <List />,
                                errorElement: <ErrorPage />
                            }
                        ]
                    },
                ]
            },
        ]
    }
], {
    basename: homepage,
});

function App() {
    const selectedTheme = useSelector(state => state.theme.selectedTheme);
    const className = classNames(`${selectedTheme}`);

    return (
        <div id='navigation-root' className={className}>
            <RouterProvider router={router} />
            <div id='popup-root' />
        </div>
    );
}

export default App;