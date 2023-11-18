import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/foodInfo.css"

export const FoodInfo = () => {
    const { store } = useContext(Context);
    const { food_info } = store;

    // Destructuramos la información necesaria de food_info
    const ingredient = food_info.ingredients?.[0]?.parsed?.[0];
    const nutrients = food_info.totalNutrients;
    const healthLabels = food_info.healthLabels;
    console.log(nutrients)
    const formatLabel = (label) => {
        // Reemplaza guiones bajos por espacios y convierte a mayúsculas la primera letra
        return label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <div className="food-info">
            <h2>{ingredient ? ingredient.food : 'No food found'}</h2>
            <div className="calories">
                <p>Calories: {food_info.calories}</p>
            </div>
            <div className="health-labels">
                <h3>Nutrition claims</h3>
                <p>
                    {healthLabels?.map((label, index) => (
                        <span key={index}>{formatLabel(label)}</span>
                    )) || 'No health labels'}
                </p>
            </div>
            <div className="nutrition-facts">
                <h1>Nutrition Facts</h1>
                <div className="nutrition-row">
                    <span className="nutrition-label">Serving Size</span>
                    <span className="nutrition-value">100g</span>
                </div>
                <div className="separator"></div>
                <div className="nutrition-row">
                    <span className="nutrition-label bold">Calories</span>
                    <span className="nutrition-value">71</span>
                </div>
                <div className="separator"></div>
                <div className="nutrition-row bold">
                    <span className="nutrition-label">Total Fat</span>
                    <span className="nutrition-value">1.52g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Saturated Fat</span>
                    <span className="nutrition-value">0.31g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Trans Fat</span>
                    <span className="nutrition-value">0g</span>
                </div>
                <div className="nutrition-row bold">
                    <span className="nutrition-label">Cholesterol</span>
                    <span className="nutrition-value">0mg</span>
                </div>
                <div className="nutrition-row bold">
                    <span className="nutrition-label">Sodium</span>
                    <span className="nutrition-value">4mg</span>
                </div>
                <div className="separator"></div>
                <div className="nutrition-row bold">
                    <span className="nutrition-label">Total Carbohydrate</span>
                    <span className="nutrition-value">12g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Dietary Fiber</span>
                    <span className="nutrition-value">1.7g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Total Sugars</span>
                    <span className="nutrition-value">0.27g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Includes</span>
                    <span className="nutrition-value">0g Added Sugars</span>
                </div>
                <div className="separator"></div>
                <div className="nutrition-row bold">
                    <span className="nutrition-label">Protein</span>
                    <span className="nutrition-value">2.54g</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Vitamin D</span>
                    <span className="nutrition-value">0µg</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Calcium</span>
                    <span className="nutrition-value">9mg</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Iron</span>
                    <span className="nutrition-value">0.9mg</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Potassium</span>
                    <span className="nutrition-value">70mg</span>
                </div>
                <div className="nutrition-row">
                    <span className="nutrition-label">Vitamin C</span>
                    <span className="nutrition-value">0mg</span>
                </div>
                <div className="footer">
                    * Percent Daily Values are based on a 2000 calorie diet.
                </div>
            </div>
        </div>
    );
};
