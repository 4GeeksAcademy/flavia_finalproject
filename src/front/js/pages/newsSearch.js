import React, { useState, useEffect } from 'react';
import { SearchCard } from '../component/searchCard';

export const NewsSearch = () => {
    const [fromDate, setFromDate] = useState('2023-11-01');
    const [toDate, setToDate] = useState('2023-11-13');
    const [sortBy, setSortBy] = useState('popularity');
    const [articles, setArticles] = useState([]);

    const query = 'healthy recipes';
    const fetchArticles = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/everything?q=${query}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}`);
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchArticles();
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
            <button onClick={fetchArticles}>Search</button>
            <div>
                {articles.map((article, index) => (
                    <SearchCard title={article.title} url={article.url} author={article.author} />
                ))}
            </div>
        </div>
    );
};

