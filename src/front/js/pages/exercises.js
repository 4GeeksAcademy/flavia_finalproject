import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

export const Exercises = () => {
    const { store, actions } = useContext(Context);
    const [category, setCategory] = useState('full-body');
    const [visibleVideos, setVisibleVideos] = useState(4);
    const categories = ['full-body', 'upper-body', 'lower-body', 'arms', 'abs', 'legs'];

    const handle_searchVideos = () => {
        actions.searchVideos(category);
        setVisibleVideos(4); // Restablece la cantidad visible de videos cada vez que se realiza una nueva búsqueda
    };

    const handleLoadMore = () => {
        setVisibleVideos(prev => prev + 4); // Añade 4 videos más a la visualización
    };

    return (
        <div>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
                ))}
            </select>
            <button onClick={handle_searchVideos}>Buscar</button>
            <div className="video-container">
                {store.videos && store.videos.slice(0, visibleVideos).map(video => (
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
            {store.videos && visibleVideos < store.videos.length && (
                <button onClick={handleLoadMore}>Cargar más</button>
            )}
        </div>
    );
}
