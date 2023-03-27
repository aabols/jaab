import React, { useEffect, useState } from 'react';
import Menu from '../menu';
import MenuItem from '../menu/item';

export default function SearchInput({ id, label, finder, display, onSelect }) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedQuery(query);
        }, 200);
        return () => clearTimeout(debounce);
    }, [query]);

    useEffect(() => {
        if (!debouncedQuery) return;
        const cancel = finder(debouncedQuery, setResults);
        return cancel;
    }, [finder, debouncedQuery]);

    const handleSelect = (result) => e => {
        setQuery('');
        setDebouncedQuery('');
        setResults([]);
        onSelect(e, result);
    };

    const menuItems = results.map((result, index) => (
        <MenuItem key={index} onClick={handleSelect(result)}>{display(result)}</MenuItem>
    ));

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    return (
        <div className='form__field'>
            <label htmlFor={id}> {label} </label>
            <input
                className='form__input'
                type='text'
                id={id}
                value={query}
                onChange={handleChange}
            />
            <div className='floater'> {
                menuItems.length > 0 &&
                <div className='floater__content'>
                    <Menu>
                        {menuItems}
                    </Menu>
                </div>
            } </div>
        </div>
    );
};
