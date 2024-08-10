import styles from "./searchbar.module.scss";

export default function Searchbar({ onSearch }) {
  const handInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Where do we go?"
        className={styles.input}
        onChange={handInputChange}
      />

    </div>
  );
}
