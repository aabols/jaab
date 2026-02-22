import React from 'react';
import './index.css'
import { scheduleRecipeSteps } from './scheduling';
import MealPlannerToolbar from './toolbar';
import MealPlan from './mealPlan';

// Test payload for a sample meal
const testMeal = [
    { id: '1', title: 'Boil Water', duration: 300, prerequisites: [] },
    { id: '2', title: 'Cook Pasta', duration: 600, prerequisites: ['1'] },
    { id: '3', title: 'Prepare Sauce', duration: 900, prerequisites: [] },
    { id: '4', title: 'Combine Pasta and Sauce', duration: 300, prerequisites: ['2', '3'] },
];

const scheduledMeal = scheduleRecipeSteps(testMeal);

export default function MealPlanner() {
    return (
        <div id='meal-planner'>
            <MealPlannerToolbar />
            <MealPlan steps={scheduledMeal} />
        </div>
    );
};