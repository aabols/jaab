import React from 'react';
import MenuCard from '../menuCard';
import Button from '../../_shared/button'

export default function SelectionMenu({ options, onAdd, onClear }) {
  return (
    <aside className="food-aside">
      <h3 className="food-aside__title">Foods</h3>

      <div className="food-list">
        {options.map(item => (
          <MenuCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </aside>
  );
}
