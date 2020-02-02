import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  setSearchTerm,
  searchTerm,
  handleSearch,
  adult,
  setAdult
}) => {
  return (
    <div className="search-form">
      <form onSubmit={handleSearch}>
        <div>
          <input
            type="text"
            placeholder="Search your Flick and chill..."
            className="search-input"
            required={true}
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <label className="search-adult">Include adult results?</label>
          <input type="checkbox" checked={adult} onClick={setAdult} />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SearchBar);
