import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import SelectionMenu from './selectionMenu';
import Calculator from './calculator';

// Sample hard-coded food data (per-item values)
const FOOD_ITEMS = [
    { id: 'egg', name: 'Egg', protein: 6, carbs: 0.6, fats: 5, calories: 78 },
    { id: 'banana', name: 'Banana', protein: 1.3, carbs: 27, fats: 0.3, calories: 105 },
    { id: 'chicken', name: 'Chicken breast (100g)', protein: 31, carbs: 0, fats: 3.6, calories: 165 },
    { id: 'rice', name: 'Cooked rice (100g)', protein: 2.7, carbs: 28, fats: 0.3, calories: 130 },
    { id: 'avocado', name: 'Avocado (half)', protein: 1.5, carbs: 9, fats: 15, calories: 160 },
    { id: 'almonds', name: 'Almonds (30g)', protein: 6, carbs: 6, fats: 14, calories: 164 }
];

// child components moved to their own files

export default function Food() {
    useEffect(() => {
        document.title = 'Nutrition Calculator';
    }, []);

    // selected: { [id]: count }
    const [selected, setSelected] = useState({});

    const addFood = (id) => {
        setSelected(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const removeFood = (id) => {
        setSelected(prev => {
            if (!prev[id]) return prev;
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const decrementFood = (id) => {
        setSelected(prev => {
            const count = prev[id] || 0;
            if (count <= 1) {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            }
            return { ...prev, [id]: count - 1 };
        });
    };

    const clearAll = () => setSelected({});

    const selectedList = useMemo(() => {
        return Object.keys(selected).map(id => {
            const food = FOOD_ITEMS.find(f => f.id === id) || { id, name: id, protein: 0, carbs: 0, fats: 0, calories: 0 };
            return { ...food, count: selected[id] };
        });
    }, [selected]);

    const totals = useMemo(() => {
        return selectedList.reduce((acc, f) => {
            if (!f) return acc;
            acc.protein += (f.protein || 0) * f.count;
            acc.carbs += (f.carbs || 0) * f.count;
            acc.fats += (f.fats || 0) * f.count;
            acc.calories += (f.calories || 0) * f.count;
            return acc;
        }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
    }, [selectedList]);

    return (
        <div id="food" className="food-root">
            <SelectionMenu options={FOOD_ITEMS} onAdd={addFood} onClear={clearAll} />
            <Calculator selectedList={selectedList} totals={totals} onIncrement={addFood} onDecrement={decrementFood} onRemove={removeFood} onClear={clearAll} />
        </div>
    );
}
