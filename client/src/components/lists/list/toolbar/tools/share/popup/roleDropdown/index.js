import React, { forwardRef } from 'react';

const roles = [
    { level: 1, name: 'Owner' },
    { level: 2, name: 'Collaborator' },
    { level: 3, name: 'Contributor' },
    { level: 4, name: 'Checker' },
    { level: 5, name: 'Viewer' },
];

const RoleDropdown = forwardRef(({ defaultLevel, onChange }, ref) => {
    return (
        <select ref={ref} onChange={onChange} defaultValue={defaultLevel}>
            {roles.map(role => (
                <option key={role.level} value={role.level}>{role.name}</option>
            ))}
        </select>
    );
});

export default RoleDropdown;
