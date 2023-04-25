import style from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onClickSearch, onClickAdd }) => {
    const [search, setSearch] = useState("");

    return (
        <div className={style.searchBar}>
            <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div
                className={style.iconSearch}
                onClick={() => onClickSearch(search.trim().toLowerCase())}
            ></div>
            <div className={style.add}>
                <a href="#" onClick={onClickAdd}>
                    <p>+</p>
                </a>
            </div>
        </div>
    );
};

export default SearchBar;
