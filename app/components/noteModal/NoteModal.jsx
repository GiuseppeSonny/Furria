import styles from "./NoteModal.module.scss";
import { useState } from "react";
import { FaUtensils, FaFilm, FaLandmark, FaBus, FaHotel } from "react-icons/fa";

const NoteModal = ({ cityId, onClose }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      text,
      cityId,
    };

    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error("Failed to create a note");
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add your thoughts</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Note:</label>
            <input type="text" onChange={(e) => setText(e.target.value)} />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>
              Go back
            </button>
            <button className={styles.submitButton} type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
