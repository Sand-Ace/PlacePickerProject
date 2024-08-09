import classes from "./Places.module.css";

export default function Places({ places, title, onSelect, fallbacktext }) {
  return (
    <section className={classes["place-category"]}>
      <h2>{title}</h2>
      {!places ||
        (places.length == 0 && (
          <p className={classes.fallbacktext}>{fallbacktext}</p>
        ))}
      <ul className={classes.places}>
        {places.map((place) => (
          <li className={classes["place-item"]} key={place.id}>
            <button onClick={() => onSelect(place.id)}>
              <img src={place.image.src} alt={place.image.alt} />
              <h3>{place.title}</h3>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
