import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { userActions } from '../_actions/userActions';

export default function Register() {
    const [formValues, setFormValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
    });

    const registering = useSelector(state => state.auth.registering);
    const error = useSelector(state => state.auth.registerError);
    const message = useSelector(state => state.auth.registerMessage);
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
        const { passwordConfirmation, ...registrationData } = formValues;
        dispatch(userActions.register(registrationData));
    };

    const validateForm = ({ email, firstName, lastName, password, passwordConfirmation }) => {
        return (
            !!email && !!firstName && !!lastName && !!password
        ) && (
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) && (
            password === passwordConfirmation && password.length >= 8
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label><br />
                <input type="text" id="email" name="email" value={formValues.email} onChange={handleInputChange} /><br />

                <label htmlFor="firstName">Name:</label><br />
                <input type="text" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} /><br />

                <label htmlFor="lastName">Surname:</label><br />
                <input type="text" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} /><br />

                <label htmlFor="password">Password (at least 8 characters):</label><br />
                <input type="password" id="password" name="password" value={formValues.password} onChange={handleInputChange} /><br />

                <label htmlFor="passwordConfirmation">Confirm password:</label><br />
                <input type="password" id="passwordConfirmation" name="passwordConfirmation" value={formValues.passwordConfirmation} onChange={handleInputChange} /><br />

                <input type="submit" disabled={registering || !validateForm(formValues)} value={`Register${registering ? 'ing...' : ''}`} />
            </form>
            <div style={{
                color: error ? 'red' : 'green',
                fontWeight: 'bold'
            }}>
                {message}
            </div>
            <div>
                <Link to='/login'>Log in</Link>
            </div>
        </>
    );
};