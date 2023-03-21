import React, { useState } from 'react';
import ListNavigation from './navigation';
import { IoMenuSharp } from 'react-icons/io5';
import { GiSettingsKnobs } from 'react-icons/gi'
import Icon from '../../_shared/icon';
import If from '../../_shared/if';
import ListsSettings from './settings';

export default function SideBar() {
    const [selectedOption, setSelectedOption] = useState();
    const close = () => setSelectedOption(null);

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
        active={option.title === selectedOption?.title}
        onClick={() => setSelectedOption(opt => opt?.title === option.title ? null : option)}
    />);

    return (
        <div id='side-bar'>
            <div id='side-bar-icons'>{icons}</div>
            <If condition={selectedOption}>
                <div id='side-bar-content'>
                    <center><b>{selectedOption?.title}</b></center>
                    <div className='menu__divider' />
                    {selectedOption?.body}
                </div>
            </If>
        </div>
    );
};
