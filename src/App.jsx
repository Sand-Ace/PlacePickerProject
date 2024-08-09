// import { AVAILABLE_PLACES } from "./data";

import { useState } from "react";
import Header from "./Components/Header/Header";
import Places from "./Components/Places/Places";

import { AVAILABLE_PLACES } from "./data";

function App() {
  const [selectedPlace, setSelectedPlace] = useState([]);

  // handling selected places
  function handleSelectPlace(getId) {
    setSelectedPlace((prevSelectedPlace) => {
      if (prevSelectedPlace.some((place) => place.id === getId)) {
        return prevSelectedPlace;
      } else {
        const place = AVAILABLE_PLACES.find((place) => place.id === getId);
        return [place, ...prevSelectedPlace];
      }
    });
  }

  function handleRemoveSelectedPlace(getId) {
    setSelectedPlace((prevSelectedPlace) => {
      const filteredSelectedPlace = prevSelectedPlace.filter(
        (place) => place.id !== getId
      );
      return filteredSelectedPlace;
    });
  }

  return (
    <>
      <Header />
      <Places
        places={selectedPlace}
        title="I'd like to visit.."
        onSelect={handleRemoveSelectedPlace}
      />
      <Places
        places={AVAILABLE_PLACES}
        title="Available Places"
        onSelect={handleSelectPlace}
      />
    </>
  );
}

export default App;
