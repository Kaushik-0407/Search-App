import { useState, useEffect } from "react";

const useSearch = () => {
  const [userInput, setUserInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [cache, setCache] = useState({});

  const handleSearch = async () => {
    if (cache[userInput]) {
      setFilteredData(cache[userInput]);
      return;
    }
    const data = await fetch("/json/dummyData.json");
    const json = await data.json();

    const results = json?.filter((item) =>
      item.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setCache((prev) => {
      const newCache = { ...prev, [userInput]: results };
      const keys = Object.keys(newCache);  
      console.log("keys", keys)
      if (keys.length > 10) {
        delete newCache[keys[0]]; 
      }
      return newCache;
    });
    setFilteredData(results); 
  };

  useEffect(() => {
    if (userInput !== "") {
      const timer = setTimeout(handleSearch, 300);
      return () => clearTimeout(timer);
    }
  }, [userInput]);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const index = lowerText.indexOf(lowerHighlight);
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <b>{text.substring(index, index + highlight.length)}</b>
        {text.substring(index + highlight.length)}
      </>
    );
  };

  return {
    userInput,
    setUserInput,
    filteredData,
    setFilteredData,
    showList,
    setShowList,
    highlightText,
  };
};

export default useSearch;
