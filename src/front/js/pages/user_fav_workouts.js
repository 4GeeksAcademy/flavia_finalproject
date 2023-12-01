import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import "../../styles/user_fav_workouts.css"

export const UserFavWorkouts = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.userFavWorkouts(accessToken);
    }, [accessToken]);

    const deleteFavWorkout = (videoId) => {
        actions.handleDeleteFavWorkout(videoId);
    }

    return (
        <div className="videos-container2">
            <h4 className='my-appointments'>My Favorite Workouts</h4>
            {
                store.user_fav_workouts.map((item, index) => (
                    <div className="video-card">
                        <div key={item.videoId} className="video-card-image2">
                            <LiteYouTubeEmbed
                                id={item.videoId}
                            />
                            <button className='deleteFavWorkout' onClick={() => deleteFavWorkout(item.videoId)}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}