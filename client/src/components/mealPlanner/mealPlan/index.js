import React from 'react';
import MealStep from "./mealStep";

export default function MealPlan({ steps }) {
    console.log(steps);
    const stepLines = steps.map(MealStep);
    return (
        <div id='meal-plan'>
            {stepLines}
        </div>
    );
};
