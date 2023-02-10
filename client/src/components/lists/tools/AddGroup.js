import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { listsActions } from '../../../_actions/listsActions';
import { GoDiffAdded } from 'react-icons/go';
import Popup from 'reactjs-popup';

export default function AddGroup({ list }) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const popupRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return popupRef.current.close();
        dispatch(listsActions.createGroup({
            listId: list.id,
            title
        }));
        titleRef.current.value = '';
    }

    const trigger = (
        <div className='icon' title='Add group'>
            <GoDiffAdded/>
        </div>
    );

    const body = (
        <div className = 'menu'>
            <div className = 'menu__item menu__item--centered'>
                <form className = 'form form--medium' onSubmit={ handleSubmit }>
                    <div className = 'form__field'>
                    <label htmlFor = 'title'>
                        New group:
                    </label>
                    <input
                        className = 'form__input'
                        type = 'text'
                        name = 'title'
                        ref = { titleRef }
                    />
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Popup
            className = 'menu__popup'
            trigger = { trigger }
            ref = { popupRef }
            position = 'bottom center'
            arrow = { false }
            children = { body }
        />
    )
};