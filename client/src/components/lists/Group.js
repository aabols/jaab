import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import { listsActions } from '../../_actions/listsActions';
import { sortOptions } from '../../utils/sortFunctions';
import Item from './Item';
import If from '../If';
import GroupForm from './GroupForm';

export default function Group({ groupId }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const groups = useSelector(state => state.lists.groups);
    const allItems = useSelector(state => state.lists.items);
    const shoppingMode = useSelector(state => state.lists.settings.shoppingMode);
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);

    const group = groups.find(group => group.id === groupId);
    const items = allItems.filter(item => item.groupId === group.id)
        .filter(({ checked }) => !shoppingMode || !checked)
        .filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(({ title }) => title.toLowerCase().includes(globalSearch.toLowerCase()))
        .sort(sortOptions.titleAZ.fn)
        .map(({ id }) => <Item key={id} itemId={id} />);

    const handleCreateItem = (e) => {
        e.preventDefault();
        const title = searchQuery;
        if (!title) return;
        setSearchQuery('');
        dispatch(listsActions.createItem({ listId: group.listId, groupId: group.id, title, checked: false }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCollapse = (e) => {
        setCollapsed(collapsed => !collapsed);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    const groupPopup = (
        <Popup
            className='modal-popup'
            open={edit}
            onClose={() => setEdit(false)}
            children={<GroupForm
                group={group}
                onUpdate={() => setEdit(false)}
                onDelete={() => setEdit(false)}
            />}
        />
    );

    return (
        <fieldset className={classNames({
            'group': true,
            'group--collapsed': collapsed,
        })}>
            <legend className='group__caption' onClick={handleCollapse} onContextMenu={handleEdit}>
                {group.title}
            </legend>
            <If condition={!collapsed}>
                <form className='form form--narrow' onSubmit={handleCreateItem}>
                    <input
                        className='form__input'
                        type='text'
                        name='title'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
                <div className='group__items'>
                    {items}
                </div>
            </If>
            {groupPopup}
        </fieldset>
    )
};