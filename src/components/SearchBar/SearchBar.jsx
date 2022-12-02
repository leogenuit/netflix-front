import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ searchString, setSearchString }) => {
  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        value={searchString}
        onChange={handleSearch}
        placeholder="Search Movie..."
      />
    </div>
  );
};

export default SearchBar;
