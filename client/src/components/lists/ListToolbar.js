import React from 'react';
import AddGroup from './tools/AddGroup';
import ShareList from './tools/ShareList';
import ShoppingMode from './tools/ShoppingMode';
import SortGroups from './tools/SortGroups';
import SearchList from './tools/SearchList';

export default function ListToolbar({ list }) {
    return (
        <div id='ListToolbar' className='toolbar'>
            <ShoppingMode />
            <AddGroup list={list} />
            <SearchList list={list} />
            <ShareList list={list} />
            <SortGroups />
        </div>
    )
};