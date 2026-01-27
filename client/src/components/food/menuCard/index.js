import React from 'react';

export default function MenuCard({ item, onAdd }) {
  return (
    <div
      className="food-card"
      role="button"
      tabIndex={0}
      onClick={() => onAdd(item.id)}
      onKeyDown={(e) => { if (e.key === 'Enter') onAdd(item.id); }}
      title={`Add ${item.name}`}
    >
      <div className="food-card__name">{item.name}</div>
      <div className="food-card__meta">P: {item.protein}g &nbsp; C: {item.carbs}g &nbsp; F: {item.fats}g &nbsp; {item.calories} kcal</div>
    </div>
  );
}
