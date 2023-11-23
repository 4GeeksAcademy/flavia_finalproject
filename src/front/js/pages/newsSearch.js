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

    const imageUrls = [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1521986329282-0436c1f1e212?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

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
                    <SearchCard key={article.title} title={article.title} url={article.url} author={article.author} imageUrl={imageUrls[index % imageUrls.length]} />
                ))}
            </div>
        </div>
    );
};

