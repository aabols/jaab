import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { listsConstants } from '../../../_constants/listsConstants';
import { sortOptions } from '../../../utils/sortFunctions';
import classNames from 'classnames';

const sortOptionKeys = Object.keys(sortOptions);

export default function SortGroups() {
    const dispatch = useDispatch();
    const sortMenuRef = useRef();
    const sortOption = useSelector(state => state.lists.settings.sortOption);

    const currentSortIcon = (
        <div
            className='icon'
            key={sortOption}
            title={sortOptions[sortOption].title}
        >
            {sortOptions[sortOption].icon()}
        </div>
    );

    const sortIcons = sortOptionKeys
        .map(opt => (
            <div
                className={classNames({
                    'icon': true,
                    'icon--120': true,
                    'icon--inverted': opt === sortOption,
                })}
                key={opt}
                title={sortOptions[opt].title}
                onClick={e => {
                    e.preventDefault();
                    dispatch({
                        type: listsConstants.SET_SORT_OPTION,
                        payload: opt
                    });
                }}
            >
                {sortOptions[opt].icon()}
            </div>
        ));

    return (
        <Popup
            className='menu__popup'
            trigger={currentSortIcon}
            ref={sortMenuRef}
            arrow={false}
            overlayStyle={{ display: 'none' }}
            position='bottom center'
            keepTooltipInside={true}
        >
            <div className='menu'>
                {sortIcons}
            </div>
        </Popup>
    )
};