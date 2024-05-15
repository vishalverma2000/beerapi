import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries"
      );
      const data = await response.json();
      setBeers(data);
    };
    fetchData();
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Your Api gives Server error I use this api "https://api.openbrewerydb.org/v1/breweries"
  // which have no images so don't mind..

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="card-container">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="card">
            <img src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
            <p>{beer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
