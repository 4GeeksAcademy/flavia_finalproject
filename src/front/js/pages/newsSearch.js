import React, { useState, useEffect, useContext } from 'react';
import { SearchCard } from '../component/searchCard';
import { Context } from "../store/appContext";

export const NewsSearch = () => {
    const { store, actions } = useContext(Context)
    const [fromDate, setFromDate] = useState('2023-11-01');
    const [toDate, setToDate] = useState('2023-11-13');
    const [sortBy, setSortBy] = useState('popularity');

    const handle_fetchArticles = () => {
        actions.fetchArticles(fromDate, toDate, sortBy)
    }

    useEffect(() => {
        actions.fetchArticles(fromDate, toDate, sortBy)
    }, []);

    return (
        <div>
            <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
            />
            <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="publishedAt">Published</option>
                <option value="popularity">Popularity</option>
                <option value="relevancy">Relevancy</option>
            </select>
            <button onClick={handle_fetchArticles}>Search</button>
            <div>
                {store.articles.map((article, index) => (
                    <SearchCard title={article.title} url={article.url} author={article.author} />
                ))}
            </div>
        </div>
    );
};

