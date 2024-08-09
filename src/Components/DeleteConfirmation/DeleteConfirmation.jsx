import classes from "./DeleteConfirmation.module.css";

export default function DeleteConfirmation({ onCancel, onDelete }) {
  return (
    <div className={classes["delete-confirmation"]}>
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this place?</p>
      <div className={classes["confirmation-actions"]}>
        <button className={classes["button-text"]} onClick={onCancel}>
          No
        </button>
        <button className={classes.button} onClick={onDelete}>
          Yes
        </button>
      </div>
    </div>
  );
}
