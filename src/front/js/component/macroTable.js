import React from 'react';
import "../../styles/macroTable.css"

export const MacroTable = ({calories, totalFat, saturatedFat, transFat, cholesterol, sodium, totalCarbs, dietaryFiber, totalSugars, protein, vitaminD, calcium, iron, potassium, vitaminC, sugarAdded}) => {
    return (
        <>
            <div className="nutrition-row">
                <span className="nutrition-label">Serving Size</span>
                <span className="nutrition-value">100g</span>
            </div>
            <div className="separator"></div>
            <div className="nutrition-row">
                <span className="nutrition-label bold">Calories</span>
                <span className="nutrition-value">{calories}</span>
            </div>
            <div className="separator"></div>
            <div className="nutrition-row bold">
                <span className="nutrition-label">Total Fat</span>
                <span className="nutrition-value">{totalFat}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Saturated Fat</span>
                <span className="nutrition-value">{saturatedFat}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Trans Fat</span>
                <span className="nutrition-value">{transFat}g</span>
            </div>
            <div className="nutrition-row bold">
                <span className="nutrition-label">Cholesterol</span>
                <span className="nutrition-value">{cholesterol}mg</span>
            </div>
            <div className="nutrition-row bold">
                <span className="nutrition-label">Sodium</span>
                <span className="nutrition-value">{sodium}mg</span>
            </div>
            <div className="separator"></div>
            <div className="nutrition-row bold">
                <span className="nutrition-label">Total Carbohydrate</span>
                <span className="nutrition-value">{totalCarbs}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Dietary Fiber</span>
                <span className="nutrition-value">{dietaryFiber}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Total Sugars</span>
                <span className="nutrition-value">{totalSugars}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Includes</span>
                <span className="nutrition-value">{sugarAdded}g Added Sugars</span>
            </div>
            <div className="separator"></div>
            <div className="nutrition-row bold">
                <span className="nutrition-label">Protein</span>
                <span className="nutrition-value">{protein}g</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Vitamin D</span>
                <span className="nutrition-value">{vitaminD}µg</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Calcium</span>
                <span className="nutrition-value">{calcium}mg</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Iron</span>
                <span className="nutrition-value">{iron}mg</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Potassium</span>
                <span className="nutrition-value">{potassium}mg</span>
            </div>
            <div className="nutrition-row">
                <span className="nutrition-label">Vitamin C</span>
                <span className="nutrition-value">{vitaminC}mg</span>
            </div>
            <div className="footer">
                * Percent Daily Values are based on a 2000 calorie diet.
            </div>
        </>
    )
}