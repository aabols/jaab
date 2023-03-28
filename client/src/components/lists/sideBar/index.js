import React, { useState } from 'react';
import ListNavigation from './navigation';
import { IoMenuSharp } from 'react-icons/io5';
import { GiSettingsKnobs } from 'react-icons/gi'
import Icon from '../../_shared/icon';
import If from '../../_shared/if';
import ListsSettings from './settings';
import { BsPinAngle, BsPinFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

export default function SideBar() {
    const { listId } = useParams();
    const [pinned, setPinned] = useState(false);
    const [selectedOption, setSelectedOption] = useState(listId ? null : 'Lists');

    const close = () => {
        if (pinned) return;
        setSelectedOption(null);
    };

    const options = [
        {
            title: 'Lists',
            icon: <IoMenuSharp />,
            body: <ListNavigation onNavigate={close} />,
        }, {
            title: 'Settings',
            icon: <GiSettingsKnobs />,
            body: <ListsSettings onSave={close} />,
        }
    ];

    const icons = options.map(option => <Icon
        key={option.title}
        title={option.title}
        icon={option.icon}
        active={option.title === selectedOption}
        onClick={() => setSelectedOption(opt => opt === option.title ? null : option.title)}
    />);

    const body = options.find(o => o.title === selectedOption)?.body;

    return (
        <div id='side-bar'>
            <div id='side-bar-icons'>{icons}</div>
            <If condition={selectedOption}>
                <div id='side-bar-content'>
                    <div id='side-bar-header'>
                        <div id='side-bar-title'>
                            {selectedOption}
                        </div>
                        <div id='side-bar-pin'>
                            <Icon
                                icon={pinned ? <BsPinFill /> : <BsPinAngle />}
                                onClick={() => setPinned(p => !p)}
                            />
                        </div>
                    </div>
                    <div className='menu__divider' />
                    {body}
                </div>
            </If>
        </div>
    );
};
