"use client";

import style from "./SearchBar.module.css";
import { useState } from "react";

const capitalizeString = (str) => {
    return str
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
};

const SearchBar = ({ onClickSearch, onClickAdd }) => {
    const [search, setSearch] = useState("");

    const submitSearch = () => onClickSearch(capitalizeString(search.trim()));

    return (
        <div className={style.searchBar}>
            <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.code === "Enter" && !e.repeat) submitSearch();
                }}
            />
            <div className={style.iconSearch} onClick={() => submitSearch()}></div>
            <button type="button" className={style.add} onClick={onClickAdd}>
                +
            </button>
        </div>
    );
};

export default SearchBar;
