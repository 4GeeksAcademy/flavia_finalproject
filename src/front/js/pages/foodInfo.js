import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/foodInfo.css"
import { MacroTable } from '../component/macroTable';

export const FoodInfo = () => {
    const { store, actions } = useContext(Context);
    const food_info = store.food_info || {};
    const ingredient = food_info.ingredients?.[0]?.parsed?.[0];
    console.log(ingredient)
    const nutrients = food_info.totalNutrients || {};
    const healthLabels = food_info.healthLabels || [];

    const formatLabel = (label) => {
        return label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    const getNutrientQuantity = (nutrient) => {
        const quantity = nutrient?.quantity || 0;
        return typeof quantity === 'number' ? +quantity.toFixed(2) : 0;
    };


    const calculateRoundedPercentage = (nutrientGrams, nutrientKcalPerGram) => {
        const totalCalories = food_info.calories > 0 ? food_info.calories : 1;
        return Math.floor((nutrientGrams * nutrientKcalPerGram) / totalCalories * 100);
    };

    let fatPercentage = calculateRoundedPercentage(getNutrientQuantity(nutrients.FAT), 9);
    let carbsPercentage = calculateRoundedPercentage(getNutrientQuantity(nutrients.CHOCDF), 4);
    let proteinPercentage = calculateRoundedPercentage(getNutrientQuantity(nutrients.PROCNT), 4);

    const totalRoundedPercentage = fatPercentage + carbsPercentage + proteinPercentage;
    const remainder = 100 - totalRoundedPercentage;

    if (remainder > 0) {
        const fatResidue = getNutrientQuantity(nutrients.FAT) * 9 % 1;
        const carbsResidue = getNutrientQuantity(nutrients.CHOCDF) * 4 % 1;
        const proteinResidue = getNutrientQuantity(nutrients.PROCNT) * 4 % 1;
        const maxResidue = Math.max(fatResidue, carbsResidue, proteinResidue);

        if (maxResidue === fatResidue) {
            fatPercentage += remainder;
        } else if (maxResidue === carbsResidue) {
            carbsPercentage += remainder;
        } else {
            proteinPercentage += remainder;
        }
    }

    const carbsStart = fatPercentage;
    const proteinStart = carbsStart + carbsPercentage;

    const accessToken = sessionStorage.getItem('accessToken');
    const handle_fav_food = (foodId, measureURI, food, calories) => {
        const fav_food = {
            'foodId': foodId,
            'measureURI': measureURI,
            'foodName': food,
            'calories': calories
        }
        actions.addFavFood(fav_food, accessToken)
    }

    return (
        <div className="food-info-container">
            <div className="left-content">
                <div className='food-info-title'><h2>{ingredient ? ingredient.food : 'No food found'}</h2> <button onClick={() => { handle_fav_food(ingredient.foodId, ingredient.measureURI, ingredient.food, food_info.calories) }}>add to favorites</button></div>
                <div className="chart-container">
                    <div className="circle-chart" style={{
                        background: `conic-gradient(
                        #FF6347 0% ${fatPercentage}%,
                        #FFD700 ${carbsStart}% ${proteinStart}%,
                        #90EE90 ${proteinStart}% 100%
                    )`
                    }}>
                        <div>
                            <span>{food_info.calories}<br />Calories</span>
                        </div>
                    </div>
                    <ul className="nutrition-info">
                        <li><span className="dot fat"></span>{getNutrientQuantity(nutrients.FAT)}g Fat</li>
                        <li><span className="dot carbs"></span>{getNutrientQuantity(nutrients.CHOCDF)}g Carbs</li>
                        <li><span className="dot protein"></span>{getNutrientQuantity(nutrients.PROCNT)}g Protein</li>
                    </ul>
                </div>
                <div className="health-labels">
                    <h3>Nutrition claims</h3>
                    <p>
                        {healthLabels?.map((label, index) => (
                            <span key={index}>{formatLabel(label)}</span>
                        )) || 'No health labels'}
                    </p>
                </div>
            </div>
            <div className="right-content">
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
        </div>
    );
};
