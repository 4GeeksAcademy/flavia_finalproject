import React, { useState } from 'react';
import "../../styles/searchCard.css"

export const SearchCard = ({ title, url, author, imageUrl }) => {

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
                <a href={url} target="_blank" className="action-link">+</a>
            </div>
        </div>
    )
}
