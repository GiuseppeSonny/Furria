import styles from "./buttonAddNote.module.scss";

const ButtonAddNote = ({ onClick }) => {
  return (
    <div className={styles.addButtonContainer}>
      <button className={styles.addButton} onClick={onClick}>
        Add Note{" "}
      </button>
    </div>
  );
};
export default ButtonAddNote;
