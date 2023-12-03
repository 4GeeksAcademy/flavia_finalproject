import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/searchCard.css"

export const SearchCard = ({ title, url, author }) => {
    const { store, actions } = useContext(Context)

    const imageUrls = [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1521986329282-0436c1f1e212?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const [imageUrl] = useState(
        imageUrls[Math.floor(Math.random() * imageUrls.length)]
    );

    const accessToken = sessionStorage.getItem('accessToken');
    const handle_fav_article = (title, author, url, imageUrl) => {
        const fav_article = {
            'title': title,
            'author': author,
            'url': url,
            'imageUrl': imageUrl
        }
        actions.addFavArticle(fav_article, accessToken)
    }

    return (
        <div className="card">
            <div className="card-image-container">
                <img
                    src={imageUrl}
                    alt={title}
                    className="card-image"
                />
            </div>
            <div className="card-content">
                <h2>{title}</h2>
                <p>Author: {author}</p>
            </div>
            <div className="card-action">
                <button className='favButton' onClick={() => { handle_fav_article(title, author, url, imageUrl) }}>Save <i class="fa-solid fa-heart"></i></button>
                <a href={url} target="_blank" className="action-link">+</a>
            </div>

        </div>
    )
}
