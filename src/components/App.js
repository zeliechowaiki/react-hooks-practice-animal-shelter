import React, { useState , useEffect} from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilterChange(filter) {
    setFilters({type: filter})
  }

  function handleFindPets() {
    if (filters.type === "all") {
      fetch('http://localhost:3001/pets')
      .then(response => response.json())
      .then(data => setPets(data));
    }
    else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(response => response.json())
      .then(data => setPets(data));
    }
  }

  function handleAdoptPet(adoptedPetId) {
    setPets(pets.map(pet => {
      if (pet.id === adoptedPetId) {
        return {...pet, isAdopted: true};
      }
      else {return pet}
    }))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleFilterChange} onFindPetsClick={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
