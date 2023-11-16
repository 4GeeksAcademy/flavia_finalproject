import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

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
                {store.loading ? (
                    <p>Cargando...</p> // Muestra el mensaje de carga
                ) : (
                    store.videos && store.videos.slice(0, visibleVideos).map(video => (
                        <div key={video.id} className="video">
                            <LiteYouTubeEmbed
                                id={video.id}
                                title={video.title}
                            />
                            <p>{video.title}</p>
                        </div>
                    ))
                )}
                {!store.loading && store.videos && visibleVideos < store.videos.length && (
                    <button onClick={handleLoadMore}>Cargar más</button>
                )}
            </div>

        </div>
    );
}
