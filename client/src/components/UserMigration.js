import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { userActions } from '../_actions/userActions';
import { userConstants } from '../_constants/userConstants';
import { userServices } from '../_services/userServices';
import ConfirmButton from './lists/ConfirmButton';

export default function UserMigration() {
    const legacyUser = useSelector(state => state.auth.legacyUser);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState('');
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        username: legacyUser?.user.name,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setAlert('');
        setError(false);
        const { passwordConfirmation, ...registrationData } = formValues;
        userServices.registerLegacy(registrationData, legacyUser)
            .then(res => {
                setProcessing(false);
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: res
                });
                dispatch(userActions.legacyLogout());
                setShowSuccess(true);
            })
            .catch(err => {
                setProcessing(false);
                setError(err);
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userActions.legacyLogout());
    };

    const handleKeepAccount = (e) => {
        e.preventDefault();
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    };

    const legacyProfile = legacyUser ? (
        <div className='userCard'>
            <div className='userCard__avatar'>
                <IoPersonSharp />
            </div>
            <div className='userCard__email'>
                {legacyUser.user.name}
            </div>
        </div>
    ) : null;

    const optionsDialog = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '20em',
            alignItems: 'stretch',
            gap: '1.3em',
        }}>
            <div>
                Hi there! Things have changed around here, and your old account is, well... <i>too old</i>.
            </div>
            {legacyProfile}
            <div>
                Here are your options:
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}>
                <input
                    className='form__button'
                    type='button'
                    value='Keep this account'
                    onClick={handleKeepAccount}
                />
                <div style={{ fontSize: '0.8em' }}>
                    We will ask for some additional details, and you will keep all your lists and friends (assuming they keep <i>their</i> account). Yes - this is the sensible choice.
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}>
                <input
                    className='form__button'
                    type='button'
                    value='Log out from this account'
                    onClick={handleLogout}
                />
                <div style={{ fontSize: '0.8em' }}>
                    Maybe for some reason you are logged into <i>someone else's</i> old account, and don't feel comfortable making this decision. This is the option for you. But please tell them to come here!
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}>
                <ConfirmButton
                    value='Delete this account...'
                    confirmValue='Are you sure?'
                />
                <div style={{ fontSize: '0.8em' }}>
                    All your lists will also be deleted (unless they have been shared with someone who decides to keep their account), and you will have to register again.
                </div>
            </div>
            <div style={{ fontSize: '0.8em' }}>
                Of course, you can also <i>do nothing</i>. In that case, your account will also eventually be deleted, and you won't be able to access your lists.
            </div>
        </div>
    );

    const validateForm = ({ username, email, firstName, lastName, password, passwordConfirmation }) => {
        return (
            !!email && !!firstName && !!lastName && !!password && !!username
        ) && (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
            ) && (
                password === passwordConfirmation && password.length >= 8
            );
    };

    const detailsForm = (
        <form className='form form--wide' onSubmit={handleSubmit}>
            <div
                children={'< back'}
                onClick={() => { setShowForm(false) }}
                style={{ cursor: 'pointer' }}
            />
            <div className='form__field'>
                <label htmlFor='username'>Username (yes, you can change it):</label>
                <input
                    className='form__input'
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
                disabled={processing || !validateForm(formValues)}
                value={processing ? 'Processing' : 'Submit'}
            />
            <div
                className={classNames('alert', {
                    'alert--error': error,
                    'alert--success': !error,
                })}
                children={alert}
            />
        </form>
    );

    const successMessage = (
        <div>
            <h3>Nice one!</h3>
            <p>Your account is good to go</p>
        </div>
    );

    return (
        loaded && <Popup
            className='modal-popup'
            open={loaded}
            closeOnDocumentClick={showSuccess}
            children={
                showSuccess
                    ? successMessage
                    : showForm
                        ? detailsForm
                        : optionsDialog
            }
        />
    );
};
