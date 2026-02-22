import React from 'react';

export default function MealStep({ id, title, plannedStart }) {
    return (
        <div key={id} className='meal-planner__step'>
            <div style={{
                marginLeft: { plannedStart }
            }}>
                {title}
            </div>
        </div>
    );
};
