import React from 'react';

export const SearchCard = ({ title, url, author }) => {
    return (
        <div>
            <h5>{title}</h5>
            <p>Author: {author}</p>
            <button>
                <a href={url}
                    target="_blank">Leer más</a>
            </button>
        </div>
    )
}