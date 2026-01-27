import React from 'react';

export default function SelectedItemPill({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="pill">
      <span className="pill__name">{item.name}</span>
      <span className="pill__count">×{item.count}</span>
      <button className="pill__action" onClick={() => onDecrement(item.id)} aria-label={`Decrease ${item.name}`}>−</button>
      <button className="pill__action" onClick={() => onIncrement(item.id)} aria-label={`Increase ${item.name}`}>+</button>
      <button className="pill__remove" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>✕</button>
    </div>
  );
}
