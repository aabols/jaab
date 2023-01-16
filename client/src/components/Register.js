import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../_actions/userActions';

export default function Register() {

  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const registering = useSelector(state => state.user.registering);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(userActions.register(formValues));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail:</label><br/>
      <input
        type="text"
        id="email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      /><br/>
      <label htmlFor="firstName">Name:</label><br/>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
      /><br/>
      <label htmlFor="lastName">Surname:</label><br/>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
      /><br/>
      <label htmlFor="password">Password:</label><br/>
      <input
        type="password"
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
      /><br/>
      <input
        type="submit"
        disabled={registering}
        value={'Register' + (registering ? 'ing...' : '')}
      />
    </form>
  );
};