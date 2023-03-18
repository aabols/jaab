import React, { memo } from 'react';
import AddGroup from './tools/addGroup';
import ShareList from './tools/share';
import ShoppingMode from './tools/shoppingMode';
import SortGroups from './tools/sortGroups';
import SearchList from './tools/search';

export default memo(ListToolbar);

function ListToolbar({ listId }) {
    return (
        <div id='list-toolbar'>
            <ShoppingMode />
            <AddGroup listId={listId} />
            <SearchList listId={listId} />
            <ShareList listId={listId} />
            <SortGroups />
        </div>
    )
};
