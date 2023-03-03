import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import { userServices } from '../../_services/userServices';
import { userConstants } from '../../_constants/userConstants';

export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const legacyUser = useSelector(state => state.auth.legacyUser);
    const firstFieldRef = useRef();
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    useEffect(() => { firstFieldRef.current.focus() }, []);

    // if (user) return <Navigate to='/' />;
    if (user || legacyUser) return <Navigate to='/' />;

    const handleInputChange = (e) => {
        setFormValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    };

    //    const handleLogin = (e) => {
    //        e.preventDefault();
    //        setLoggingIn(true);
    //        setError('');
    //        userServices.login(formValues)
    //            .then(res => {
    //                setLoggingIn(false);
    //                dispatch({
    //                    type: userConstants.LOGIN_SUCCESS,
    //                    payload: res
    //                });
    //            })
    //            .catch(err => {
    //                setLoggingIn(false);
    //                setError(err);
    //            });
    //    };

    const handleLegacyLogin = (e) => {
        e.preventDefault();
        setLoggingIn(true);
        setError('');
        userServices.legacyLogin(formValues)
            .then(res => {
                setLoggingIn(false);
                if (res.user) {
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS_LEGACY,
                        payload: res
                    });
                } else {
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: res
                    });
                }
            })
            .catch(err => {
                setLoggingIn(false);
                setError(err);
            });
    };

    // const validateForm = ({ username, password }) => {
    //     if (!username || !password) return false;
    //     if (password.length < 8) return false;
    //     return true;
    // };

    const validateFormLegacy = ({ username, password }) => {
        if (!username || !password) return false;
        if (password.length < 4) return false;
        return true;
    };

    return (
        <div id='login' className='frame'>
            <form className='form form--wide' onSubmit={handleLegacyLogin}>
                <div className='form__field'>
                    <label htmlFor='username'>Username</label>
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
                    className='form__button'
                    type='submit'
                    disabled={loggingIn || !validateFormLegacy(formValues)}
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