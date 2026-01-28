import React from 'react';
import SelectedItemPill from '../selectedItemPill';
import Button from '../../_shared/button'

export default function Calculator({ selectedList, totals, onIncrement, onDecrement, onRemove, onClear }) {
  return (
    <main className="food-main">
      <header className="food-header">
        <h2 className="food-header__title">Nutrition Calculator</h2>
        <div className="pills">
          {selectedList.length === 0 && <div className="empty-hint">No foods selected yet — click a card to add.</div>}
          {selectedList.map(f => (
            <SelectedItemPill key={f.id} item={f} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={onRemove} />
          ))}
        </div>
      </header>

      <section className="totals">
        <h3>Totals</h3>
        <div className="table-wrap">
          <table className="totals-table">
            <thead>
              <tr>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fats (g)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totals.protein.toFixed(1)}</td>
                <td>{totals.carbs.toFixed(1)}</td>
                <td>{totals.fats.toFixed(1)}</td>
                <td>{Math.round(totals.calories)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="selected-details">
        <h3>Selected items (details)</h3>
        {selectedList.length === 0 ? (
          <div className="empty-hint">No items selected.</div>
        ) : (
          <table className="details-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
                <th>Calories</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedList.map(f => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>{f.count}</td>
                  <td>{(f.protein * f.count).toFixed(1)}</td>
                  <td>{(f.carbs * f.count).toFixed(1)}</td>
                  <td>{(f.fats * f.count).toFixed(1)}</td>
                  <td>{Math.round(f.calories * f.count)}</td>
                  <td><button className="remove-link" onClick={() => onRemove(f.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div className="calc-actions">
        <Button value='Clear all' onClick={onClear} />
      </div>
    </main>
  );
}
