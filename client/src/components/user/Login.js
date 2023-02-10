import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import { userServices } from '../../_services/userServices';
import { userConstants } from '../../_constants/userConstants';

export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const firstFieldRef = useRef();
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    useEffect(() => { firstFieldRef.current.focus() }, []);

    if (user) return <Navigate to='/' />;

    const handleInputChange = (e) => {
        setFormValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoggingIn(true);
        setError('');
        userServices.login(formValues)
            .then(res => {
                setLoggingIn(false);
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: res
                });
            })
            .catch(err => {
                setLoggingIn(false);
                setError(err);
            });
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
        <div id='login' className='frame'>
            <form className='form form--wide' onSubmit={handleLogin}>
                <div className='form__field'>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        className='form__input'
                        ref={firstFieldRef}
                        type='text'
                        id='email'
                        name='email'
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form__field'>
                    <label htmlFor='password'>Password</label>
                    <input
                        className='form__input'
                        type='password'
                        id='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    className='form__input form__input--button'
                    type='submit'
                    disabled={loggingIn || !validateForm(formValues)}
                    value={loggingIn ? 'Logging in...' : 'Log in'}
                />
            </form>
            <div
                className={classNames({
                    'alert': true,
                    'alert--error': error,
                })}
            >
                {error}
            </div>
            <Link className='link' to='/register'>Register</Link>
        </div>
    )
};