import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { FoodCard } from '../component/foodCard';

export const SearchFood = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { store, actions } = useContext(Context)

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        actions.foodDatabase(searchTerm)
    };
    console.log('store.food_database', store.food_database)
    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
            <button onClick={handleSearchSubmit}>Buscar</button>
            <div>
                {store.food_database.map((item, index) => {
                    const gramMeasure = item.measures.find(measure => measure.label === "Gram");
                    return (
                        <FoodCard label={item.food.label} ENERC_KCAL={item.food.nutrients.ENERC_KCAL} foodId={item.food.foodId} measureURI={gramMeasure?.uri} /> // Operador opcional de encadenamiento para evitar errores si gramMeasure es undefined
                    )
                })}
            </div>
        </div>
    );
}

