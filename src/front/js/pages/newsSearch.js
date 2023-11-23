import React, { useState, useEffect, useContext } from 'react';
import { SearchCard } from '../component/searchCard';
import { Context } from "../store/appContext";
import "../../styles/newsSearch.css";

export const NewsSearch = () => {
    const { store, actions } = useContext(Context)
    const [fromDate, setFromDate] = useState('2023-11-01');
    const [toDate, setToDate] = useState('2023-11-13');
    const [sortBy, setSortBy] = useState('popularity');

    const handle_fetchArticles = () => {
        actions.fetchArticles(fromDate, toDate, sortBy)
    }

    return (
        <div>
            <div className="form-container">
                <div className="input-field">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div className="custom-select-wrapper">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="custom-select"
                    >
                        <option value="publishedAt">Published</option>
                        <option value="popularity">Popularity</option>
                        <option value="relevancy">Relevancy</option>
                    </select>
                </div>
                <button className="search-button" onClick={handle_fetchArticles}>Search</button>
            </div>
            <div className="cards-row">
                {store.articles.slice(0, 9).map((article, index) => (
                    <SearchCard key={article.title} title={article.title} url={article.url} author={article.author} />
                ))}
            </div>
        </div>
    );
};

