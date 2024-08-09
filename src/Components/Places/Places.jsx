import { AVAILABLE_PLACES } from "../../data";

import classes from "./Places.module.css";

export default function Places() {
  return (
    <section className={classes["place-category"]}>
      <h2>Available Places</h2>
      <ul className={classes.places}>
        {AVAILABLE_PLACES.map((place) => (
          <li className={classes["place-item"]} key={place.id}>
            <button>
              <img src={place.image.src} alt={place.image.alt} />
              <h3>{place.title}</h3>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
