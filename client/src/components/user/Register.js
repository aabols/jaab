import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { userServices } from '../../_services/userServices';

export default function Register() {
    const user = useSelector(state => state.auth.user);
    const firstFieldRef = useRef();
    const [registering, setRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
    });

    useEffect(() => { firstFieldRef.current.focus() }, []);

    if (user) return <Navigate to='/' />;

    const handleInputChange = (e) => {
        setFormValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegistering(true);
        setMessage('');
        setError(false);
        const { passwordConfirmation, ...registrationData } = formValues;
        userServices.register(registrationData)
            .then(res => {
                setRegistering(false);
                setMessage(`${res.username} registered successfully!`);
            })
            .catch(err => {
                setRegistering(false);
                setError(true);
                setMessage(err);
            });
    };

    const validateForm = ({ username, email, firstName, lastName, password, passwordConfirmation }) => {
        return (
            !!email && !!firstName && !!lastName && !!password && !!username
        ) && (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
            ) && (
                password === passwordConfirmation && password.length >= 8
            );
    };

    return (
        <div id='register' className='frame'>
            <form onSubmit={handleRegister} className='form form--wide'>
                <div className='form__field'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        className='form__input'
                        ref={firstFieldRef}
                        type='text'
                        id='username'
                        name='username'
                        value={formValues.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='email'>E-mail:</label>
                    <input
                        className='form__input'
                        type='text'
                        id='email'
                        name='email'
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='firstName'>Name:</label>
                    <input
                        className='form__input'
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formValues.firstName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='lastName'>Surname:</label>
                    <input
                        className='form__input'
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formValues.lastName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='password'>Password (at least 8 characters):</label>
                    <input
                        className='form__input'
                        type='password'
                        id='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='passwordConfirmation'>Confirm password:</label>
                    <input
                        className='form__input'
                        type='password'
                        id='passwordConfirmation'
                        name='passwordConfirmation'
                        value={formValues.passwordConfirmation}
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    className='form__button'
                    type='submit'
                    disabled={registering || !validateForm(formValues)}
                    value={registering ? 'Registering' : 'Register'}
                />
            </form>
            <div
                className={classNames({
                    'alert': true,
                    'alert--error': error,
                    'alert--success': !error
                })}
                children={message}
            />
            <Link className='link' to='/login'>Log in</Link>
        </div>
    );
};