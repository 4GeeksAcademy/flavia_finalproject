import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { FoodCard } from "../component/foodCard";

export const UserFavFoods = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.userFavFoods(accessToken);
    }, [accessToken]);
    return (
        <div className='food-cards-container'>
            <h4 className='my-appointments'>My Favorite Foods</h4>
            {
                store.user_fav_foods.map((item, index) => (
                    <FoodCard label={item.foodName} ENERC_KCAL={item.calories} foodId={item.foodId} measureURI={item.measureURI} />
                ))
            }
        </div>

    )
}