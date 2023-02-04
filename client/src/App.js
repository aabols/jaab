import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import Register from './components/user/Register';
import Login from './components/user/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/user/UserPanel';
import Lists from './components/lists/Lists';
import List from './components/lists/List';

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

const Body = ({ children }) => <div className='theme-light' style={{
    width: '100vw'
}}>
    { children }
</div>;

function App() {
    return (
        <Body>
            <RouterProvider router={router}/>
        </Body>
    );
}

export default App;