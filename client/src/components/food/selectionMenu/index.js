import React from 'react';
import MenuCard from '../menuCard';

export default function SelectionMenu({ options, onAdd, onClear, onNew }) {
  return (
    <aside className="food-aside">
      <h3 className="food-aside__title">Foods</h3>
      <div className="food-aside__controls">
        <button className="btn" onClick={onClear} aria-label="Clear selection">Clear</button>
        <button className="btn" onClick={onNew} aria-label="Start new calculation">New</button>
      </div>

      <div className="food-list">
        {options.map(item => (
          <MenuCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </aside>
  );
}
