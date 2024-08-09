// import { AVAILABLE_PLACES } from "./data";

import { useEffect, useRef, useState } from "react";
import Header from "./Components/Header/Header";
import Places from "./Components/Places/Places";
import Modal from "./UI/Modal/Modal";
import DeleteConfirmation from "./Components/DeleteConfirmation/DeleteConfirmation";

import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./location";

function App() {
  const PickedPlace = useRef();
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [sortedPlacesByDistance, setSortedPlaceByDistance] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setSortedPlaceByDistance(sortedPlaces);
    });
  }, []);

  function handleSelectPlaceToRemove(getId) {
    setModalIsOpen(true);
    PickedPlace.current = getId;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

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

  function handleRemoveSelectedPlace() {
    setModalIsOpen(false);
    setSelectedPlace((prevSelectedPlace) => {
      return prevSelectedPlace.filter(
        (place) => place.id !== PickedPlace.current
      );
    });
  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onDelete={handleRemoveSelectedPlace}
        />
      </Modal>
      <Header />
      <Places
        places={selectedPlace}
        title="I'd like to visit.."
        onSelect={handleSelectPlaceToRemove}
      />
      <Places
        places={sortedPlacesByDistance}
        title="Available Places"
        fallbacktext="Fetching places by distance"
        onSelect={handleSelectPlace}
      />
    </>
  );
}

export default App;
