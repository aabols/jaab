import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { userActions } from '../_actions/userActions';

export default function Login() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const loggingIn = useSelector(state => state.auth.loggingIn);
    const error = useSelector(state => state.auth.loginError);
    const message = useSelector(state => state.auth.loginMessage);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    if (!!user) return <Navigate to='/'/>;

    const handleInputChange = (e) => {
        setFormValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.login(formValues));
    };

    const validateForm = ({ email, password }) => {
        return (
            !!email && !!password
        ) && (
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) && (
            password.length >= 8
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label><br />
                <input type="text" id="email" name="email" value={formValues.email} onChange={handleInputChange} /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={formValues.password} onChange={handleInputChange} /><br />

                <input type="submit" disabled={loggingIn || !validateForm(formValues)} value={`Log${loggingIn ? 'ging in...' : ' in'}`} />
            </form>
            <div style={{
                color: error ? 'red' : 'green',
                fontWeight: 'bold'
            }}>
                {message}
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
        </>
    )
};