import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import "../../styles/exercices.css"

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
            <div className="video-search-container">
                <select className="video-category-selector" onChange={(e) => setCategory(e.target.value)} value={category}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
                    ))}
                </select>
                <button className="video-search-button" onClick={handle_searchVideos}>Search</button>
            </div>
            {store.loading ? (
                <p>Loading...</p> // Muestra el mensaje de carga
            ) : (
                <div className="videos-container">
                    {store.videos && store.videos.slice(0, visibleVideos).map(video => (
                        <div className="video-card">
                            <div key={video.id} className="video-card-image">
                                <LiteYouTubeEmbed
                                    id={video.id}
                                    title={video.title}
                                />
                            </div>
                            <p className="video-card-title">{video.title}</p>
                            <p className="video-card-body">
                                {video.description}
                            </p>
                            <p className="video-footer">Done by <span className="by-name">{video.channel.handle}</span></p>
                        </div>
                    ))}
                </div>
            )}
            {!store.loading && store.videos && visibleVideos < store.videos.length && (
                 <div className="load-more-container">
                 <button className="video-load-more" onClick={handleLoadMore}>Cargar más</button>
             </div>
            )}
        </div>
    );
}
