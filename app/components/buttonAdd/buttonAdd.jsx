import styles from "./buttonAdd.module.scss";

const ButtonAdd = ({ onClick }) => {
  return (
    <div className={styles.addButtonContainer}>
      <button className={styles.addButton} onClick={onClick}>
        Add Expenses{" "}
      </button>
    </div>
  );
};
export default ButtonAdd;
