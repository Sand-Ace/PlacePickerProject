import logoImage from "../../assets/logo.png";
import classes from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <img src={logoImage} alt="placepicker logo image" />
      <h1>Place Picker</h1>
      <p>
        Create your personal collection of places you would like to visit or you
        have visited.
      </p>
    </header>
  );
}
