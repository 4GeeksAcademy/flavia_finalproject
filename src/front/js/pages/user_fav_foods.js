import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { FoodCard } from "../component/foodCard";
import "../../styles/user_fav_foods.css"

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
                    <div className='food-card2'>
                        <FoodCard label={item.foodName} ENERC_KCAL={item.calories} foodId={item.foodId} measureURI={item.measureURI} />
                        <button className='deleteFavFood'>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))
            }
        </div>

    )
}