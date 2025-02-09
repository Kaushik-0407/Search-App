import React from "react";
import useSearch from "../hooks/useSearch";
import { FaSearch, FaTimes } from "react-icons/fa"; 

const SearchPage = () => {
  const { userInput, setUserInput, filteredData, showList, setShowList, highlightText } = useSearch();

  return (
    <div className="search-container">
      <h1>SearchPro</h1>
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
        />
        {userInput && (
          <button className="clear-button visible" onClick={() => setUserInput("")}>
            <FaTimes />
          </button>
        )}
      </div>
      {showList && (
        <ul className="search-suggestions">
          {filteredData?.map((item) => (
            <li key={item.id}>
            <FaSearch className="list-icon" />
            {highlightText(item.name, userInput)}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
