import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../_actions/userActions';

export default function Login() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const loggingIn = useSelector(state => state.user.loggingIn);
    const error = useSelector(state => state.user.loginError);
    const message = useSelector(state => state.user.loginMessage);
    const dispatch = useDispatch();

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
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
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
            <span style={{
                color: error ? 'red' : 'green',
                fontWeight: 'bold'
            }}>
                {message}
            </span>
        </>
    )
};