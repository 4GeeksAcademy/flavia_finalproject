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

    const handle_fav_workout = (videoId) => {
        const video_Id = {
            'videoId': videoId
        }
        actions.addFavWorkout(video_Id);
    }

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
                <div className='spinner-container'>
                    <div class="spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
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
                            <p className="video-footer">Done by <span className="by-name">{video.channel.handle}</span><button onClick={() => { handle_fav_workout(video.id) }}>save</button></p>
                        </div>
                    ))}
                </div>
            )}
            {!store.loading && store.videos && visibleVideos < store.videos.length && (
                <div className="load-more-container">
                    <div className="video-load-more" onClick={handleLoadMore} tabindex="0" class="plusButton">
                        <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <g mask="url(#mask0_21_345)">
                                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}
