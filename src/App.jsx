// import { AVAILABLE_PLACES } from "./data";

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "./Components/Header/Header";
import Places from "./Components/Places/Places";
import Modal from "./UI/Modal/Modal";
import DeleteConfirmation from "./Components/DeleteConfirmation/DeleteConfirmation";

import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./location";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);
function App() {
  const PickedPlace = useRef();
  const [selectedPlace, setSelectedPlace] = useState(storedPlaces);
  const [sortedPlacesByDistance, setSortedPlaceByDistance] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const handleSucess = (position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setSortedPlaceByDistance(sortedPlaces);
    };

    const handleError = (error) => {
      console.log(`Geolocation error: ${error}`);
    };

    navigator.geolocation.getCurrentPosition(handleSucess, handleError);
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
    const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedID.indexOf(getId) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([getId, ...storedID])
      );
    }
  }

  const handleRemoveSelectedPlace = useCallback(
    function handleRemoveSelectedPlace() {
      setSelectedPlace((prevSelectedPlace) => {
        return prevSelectedPlace.filter(
          (place) => place.id !== PickedPlace.current
        );
      });
      setModalIsOpen(false);
      const storedId = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(storedId.filter((id) => id !== PickedPlace.current))
      );
    },
    []
  );

  return (
    <>
      <Modal open={modalIsOpen}>
        {modalIsOpen && (
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onDelete={handleRemoveSelectedPlace}
          />
        )}
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
