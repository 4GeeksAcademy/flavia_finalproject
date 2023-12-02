import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const UserFavArticles = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.userFavArticles(accessToken);
    }, [accessToken]);

    const deleteFavArticle = (title, author, url) => {
        const fav_article = {
            'title': title,
            'author': author,
            'url': url
        }
        actions.handleDeleteFavArticle(fav_article);
    }

    return (
        <div className="cards-row">
            <h4 className='my-appointments'>My Favorite Articles</h4>
            {
                store.user_fav_articles.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card-image-container">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="card-image"
                            />
                        </div>
                        <div className="card-content">
                            <h2>{item.title}</h2>
                            <p>Author: {item.author}</p>
                        </div>
                        <div className="card-action">
                            <button onClick={() => { deleteFavArticle(item.title, item.author, item.url) }}><i class="fa-solid fa-trash"></i></button>
                            <a href={item.url} target="_blank" className="action-link">+</a>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}