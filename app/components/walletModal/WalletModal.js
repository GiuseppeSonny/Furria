import { useState } from "react";
import styles from "./WalletModal.module.scss";
import { FaUtensils, FaFilm, FaLandmark, FaBus, FaHotel } from "react-icons/fa";

const WalletModal = ({ cityId, onClose }) => {
  const [place, setPlace] = useState("");
  const [cost, setCost] = useState(null);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const costData = {
      cost,
      cityId,
      text,
      category,
    };

    try {
      const response = await fetch("/api/cost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(costData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error("Failed to create a cost");
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const categories = [
    { name: "Cibo", icon: <FaUtensils /> },
    { name: "Spettacolo", icon: <FaFilm /> },
    { name: "Musei", icon: <FaLandmark /> },
    { name: "Trasporti", icon: <FaBus /> },
    { name: "Hotels", icon: <FaHotel /> },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Aggiungi un costo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Testo:</label>
            <input type="text" onChange={(e) => setText(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Costo:</label>
            <input type="number" onChange={(e) => setCost(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Categoria:</label>
            <div className={styles.categoryContainer}>
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`${styles.categoryItem} ${
                    category === cat.name ? styles.activeCategory : ""
                  }`}
                  onClick={() => setCategory(cat.name)}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>
              Annulla
            </button>
            <button className={styles.submitButton} type="submit">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletModal;
