import { useState } from "react";
import styles from "./notecard.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const NoteCard = ({ note }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const editNote = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const noteEditData = {
      text: note.text,
    };

    try {
      const response = await fetch(`/api/note/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteEditData),
      });
      if (!response.ok) {
        throw new Error("Note not modified!");
      }
      setIsActive(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletenote = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/note/${note._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Note item not deleted!");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.walletCard}>
      {isActive ? (
        <form onSubmit={editNote} className={styles.form}>
          <input
            type="text"
            defaultValue={note.text}
            onChange={(e) => (note.text = e.target.value)}
            className={styles.input}
          />
          <div className={styles.formButtons}>
            <button type="submit" className={styles.saveButton}>
              <SaveIcon className={styles.icon} /> Save
            </button>
            <button
              type="button"
              onClick={handleActive}
              className={styles.cancelButton}
            >
              <CloseIcon className={styles.icon} /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className={styles.details}>My thoughts: {note.text}</p>
        </>
      )}

      <div className={styles.actions}>
        <FaEdit className={styles.icon} onClick={handleActive} />
        {!isActive && <FaTrash className={styles.icon} onClick={deletenote} />}
      </div>
    </div>
  );
};

export default NoteCard;
