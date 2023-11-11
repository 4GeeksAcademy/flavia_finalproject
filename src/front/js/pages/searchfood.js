import React, { useState } from 'react';

export function SearchFood() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async () => {
        // Llama al backend para obtener los resultados
        const response = await fetch(`/search_food?query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
            <button onClick={handleSearchSubmit}>Buscar</button>
            <div>
                {results.map((item, index) => (
                    <div key={index}>
                        {/* Muestra la información relevante de cada resultado */}
                        {item.food.label} - {item.food.nutrients.ENERC_KCAL} Kcal
                    </div>
                ))}
            </div>
        </div>
    );
}

