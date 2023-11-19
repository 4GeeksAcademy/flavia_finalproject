import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/foodInfo.css"
import { MacroTable } from '../component/macroTable';

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

    const getNutrientQuantity = (nutrient) => {
        const quantity = nutrient?.quantity || 0;
        // Verificar si quantity es un número y redondear a dos decimales.
        // El '+' al inicio convierte el string resultante de nuevo a un número.
        return typeof quantity === 'number' ? +quantity.toFixed(2) : 0;
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
                {nutrients ? <MacroTable
                    calories={getNutrientQuantity(nutrients.ENERC_KCAL)}
                    totalFat={getNutrientQuantity(nutrients.FAT)}
                    saturatedFat={getNutrientQuantity(nutrients.FASAT)}
                    transFat={getNutrientQuantity(nutrients.FATRN)}
                    cholesterol={getNutrientQuantity(nutrients.CHOLE)}
                    sodium={getNutrientQuantity(nutrients.NA)}
                    totalCarbs={getNutrientQuantity(nutrients.CHOCDF)}
                    dietaryFiber={getNutrientQuantity(nutrients.FIBTG)}
                    totalSugars={getNutrientQuantity(nutrients.SUGAR)}
                    protein={getNutrientQuantity(nutrients.PROCNT)}
                    vitaminD={getNutrientQuantity(nutrients.VITD)}
                    calcium={getNutrientQuantity(nutrients.CA)}
                    iron={getNutrientQuantity(nutrients.FE)}
                    potassium={getNutrientQuantity(nutrients.K)}
                    vitaminC={getNutrientQuantity(nutrients.VITC)}
                    sugarAdded={nutrients['SUGAR.added'] ? getNutrientQuantity(nutrients['SUGAR.added']) : 0}
                /> : "No nutrition facts"}
            </div>
        </div>
    );
};
