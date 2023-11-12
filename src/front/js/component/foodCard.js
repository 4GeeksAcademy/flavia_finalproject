import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const FoodCard = ({ label, ENERC_KCAL, foodId, measureURI }) => {
    console.log('foodId', foodId, 'measureURI', measureURI)
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    const handleGetNutrients = () => {
        actions.foodInfo(foodId, measureURI)
        navigate("/get-nutrients")
    }

    return (
        <section>
            <div>
                {label} - {ENERC_KCAL} Kcal
            </div>
            <button onClick={handleGetNutrients} >See more</button>
        </section>

    )
}