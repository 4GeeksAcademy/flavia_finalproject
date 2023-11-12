import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

export function SearchFood() {
    const [searchTerm, setSearchTerm] = useState('');
    const { store, actions } = useContext(Context)
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        actions.foodDatabase(searchTerm)
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
            <button onClick={handleSearchSubmit}>Buscar</button>
            <div>
                {store.food_database.map((item, index) => (
                    <div key={index}>
                        {/* Muestra la información relevante de cada resultado */}
                        {item.food.label} - {item.food.nutrients.ENERC_KCAL} Kcal
                    </div>
                ))}
            </div>
        </div>
    );
}

