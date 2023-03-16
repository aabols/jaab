import React from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';

export default function UserCard() {
    const { firstName, lastName, username } = useSelector(state => state.auth.user);
    return (
        <div className='userCard'>
            <div className='userCard__avatar'> <IoPersonSharp /> </div>
            <div className='userCard__fullName'>{`${firstName} ${lastName}`}</div>
            <div className='userCard__email'>{username}</div>
        </div>
    );
};
