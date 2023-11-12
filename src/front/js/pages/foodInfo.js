import React, { useContext } from 'react';
import { Context } from "../store/appContext";

export const FoodInfo = () => {
    const { store } = useContext(Context);
    const { food_info } = store;

    // Comprobamos si hay ingredientes y nutrientes antes de intentar acceder a ellos
    const ingredient = food_info.ingredients?.[0]?.parsed?.[0];
    const nutrients = food_info.totalNutrients;

    return (
        <div>
            <h2>{ingredient ? ingredient.food : 'No food found'}</h2>
            <p>Calories: {food_info.calories}</p>
            <p>Health Labels: {food_info.healthLabels?.join(', ') || 'No health labels'}</p>
            <h3>Nutrition Facts</h3>
            <ul>
                {nutrients && Object.entries(nutrients).map(([key, nutrient]) => (
                    <li key={key}>
                        {nutrient.label}: {nutrient.quantity} {nutrient.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
}