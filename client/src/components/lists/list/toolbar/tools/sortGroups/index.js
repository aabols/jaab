import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { settingsConstants } from '../../../../../../_constants/settingsConstants';
import { sortOptions } from '../../../../../../utils/sortFunctions';
import Icon from '../../../../../_shared/icon';

const sortOptionKeys = Object.keys(sortOptions);

export default function SortGroups() {
    const dispatch = useDispatch();
    const sortMenuRef = useRef();
    const sortOption = useSelector(state => state.settings.sortOption);

    const currentSortIcon = <Icon
        key={sortOption}
        title={sortOptions[sortOption].title}
        icon={sortOptions[sortOption].icon()}
    />;

    const sortIcons = sortOptionKeys
        .map(opt => (
            <Icon
                key={opt}
                active={opt === sortOption}
                title={sortOptions[opt].title}
                onClick={e => {
                    e.preventDefault();
                    dispatch({
                        type: settingsConstants.SET_SORT_OPTION,
                        payload: opt
                    });
                }}
                icon={sortOptions[opt].icon()}
            />
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
            <div id='sort-menu' className='menu'>
                {sortIcons}
            </div>
        </Popup>
    )
};