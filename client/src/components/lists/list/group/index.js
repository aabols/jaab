import React, { memo, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { sortOptions } from '../../../../utils/sortFunctions';
import { itemActions } from '../../../../_actions/item';
import Item from './item';
import If from '../../../_shared/if';
import GroupPopup from './popup';

export default memo(Group);

function Group({ listId, groupId }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const { title, itemIDs } = useSelector(state => {
        const { shoppingMode, globalSearch } = state.settings;
        const { items, title } = state.lists.find(l => l.id === listId).groups.find(g => g.id === groupId);
        const itemIDs = items
            .filter(({ title, checked }) =>
                (!shoppingMode || !checked || searchQuery) &&
                (title.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (title.toLowerCase().includes(globalSearch.toLowerCase()))
            )
            .sort(sortOptions.titleAZ.fn)
            .map(item => item.id);
        return {
            title,
            itemIDs,
        };
    }, ({ title: titleA, itemIDs: itemIDsA }, { title: titleB, itemIDs: itemIDsB }) => shallowEqual(itemIDsA, itemIDsB) && titleA === titleB);

    const items = itemIDs.map(itemId => <Item key={itemId} listId={listId} groupId={groupId} itemId={itemId} />);

    const handleCreateItem = (e) => {
        e.preventDefault();
        const title = searchQuery;
        if (!title) return;
        setSearchQuery('');
        dispatch(itemActions.createItem(listId, groupId, { title }));
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

    return (
        <fieldset className={classNames({
            'group': true,
            'group--collapsed': collapsed,
        })}>
            <legend className='group__caption' onClick={handleCollapse} onContextMenu={handleEdit}>
                {title}
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
            <GroupPopup
                listId={listId}
                groupId={groupId}
                open={edit}
                setOpen={setEdit}
            />
        </fieldset>
    )
};
