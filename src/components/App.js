import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // const API_URL = `http://localhost:3001/pets`;

  const onChangeType = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const onFindPetsClick = () => {
    // const fetchData = async () => {
    //   if (filters.type === "all") {
    //     const result = await fetch(API_URL);
    //     const data = await result.json();
    //     setPets(data);
    //   } else {
    //     const result = await fetch(`${API_URL}/?type=${filters.type}`);
    //     const data = await result.json();
    //     setPets(data);
    //   }
    // };
    // fetchData();
    let url = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then((petsArray) => {
        setPets(petsArray);
      });
  };

  const onAdoptPet = (id) => {
    const updatedPet = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });

    setPets(updatedPet);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
