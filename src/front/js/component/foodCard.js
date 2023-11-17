import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/foodCard.css"

export const FoodCard = ({ label, ENERC_KCAL, foodId, measureURI }) => {
    console.log('foodId', foodId, 'measureURI', measureURI)
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    const handleGetNutrients = () => {
        actions.foodInfo(measureURI, foodId)
        navigate("/get-nutrients")
    }

    return (
        <div className="food-card">
            <div className="food-card-details">
                <p className="food-card-title">{label}</p>
                <p className="food-card-body">{ENERC_KCAL} Kcal</p>
            </div>
            <button className="food-card-button" onClick={handleGetNutrients}>More info</button>
        </div>

    )
}