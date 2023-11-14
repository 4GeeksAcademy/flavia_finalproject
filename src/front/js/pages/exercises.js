import React, { useEffect, useState } from 'react';

export const Exercises = () => {
    const [query, setQuery] = useState('exercises');
    const [category, setCategory] = useState('full-body');
    const [results, setResults] = useState([]);

    const categories = ['full-body', 'upper-body', 'lower-body', 'arms', 'abs', 'legs'];

    const search = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/search_youtube?query=${query}+${category}`);
        const data = await response.json();
        setResults(data.videos);
    };

    useEffect(() => { search() }, [])

    return (
        <div>
            <input
                type="text"
                value={query}
                placeholder="Busca un ejercicio específico o selecciona una categoría"
                onChange={e => setQuery(e.target.value)}
            />
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
                ))}
            </select>
            <button onClick={search}>Buscar</button>
            <div className="video-container">
                {results.map(video => (
                    <div key={video.id} className="video">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-frame"
                        ></iframe>
                        <p>{video.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
