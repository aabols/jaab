import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { listsActions } from '../../_actions/listsActions';
import { sortOptions } from '../../utils/sortFunctions';
import Item from './Item';
import If from '../If';

export default function Group({ groupId }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const groups = useSelector(state => state.lists.groups);
    // items should be props?
    const allItems = useSelector(state => state.lists.items);
    const shoppingMode = useSelector(state => state.lists.settings.shoppingMode);
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);

    const group = groups.find(group => group.id === groupId);
    const items = allItems.filter(item => item.groupId === group.id)
        .filter(({ checked }) => !shoppingMode || !checked)
        .filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(({ title }) => title.toLowerCase().includes(globalSearch.toLowerCase()))
        .sort(sortOptions.titleAZ.fn)
        .map(({ id }) => <Item key={id} itemId={id}/>);

    const handleRenameGroup = (e) => {
        e.preventDefault();
        const title = prompt(`Rename ${group.title}:`, group.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteGroup(group));
        dispatch(listsActions.updateGroup({ ...group, title }, group));
    };

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

    return (
        <fieldset className={classNames({
            'group': true,
            'group--collapsed': collapsed,
        })}>
            <legend className='group__caption' onContextMenu={ handleRenameGroup } onClick={ handleCollapse }>
                { group.title }
            </legend>
                <If condition={!collapsed}>
                    <form className='form' onSubmit = { handleCreateItem }>
                        <input
                            className = 'form__input'
                            type = 'text'
                            name = 'title'
                            value = { searchQuery }
                            onChange = { handleSearchChange }
                            />
                    </form>
                    <div className='group__items'>
                        { items }
                    </div>
                </If>
        </fieldset>
        )
    };