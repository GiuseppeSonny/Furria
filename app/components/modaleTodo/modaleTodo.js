import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./modaleTodo.module.scss";
import { FaMapMarkerAlt, FaClock, FaStickyNote, FaLocationArrow } from "react-icons/fa";
import MapModal from "../mapmodal/MapModal";

const ModaleTodo = ({ cityId, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      date: date.toISOString(),
      place,
      time,
      text,
      cityId,
    };

    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error("Failed to create todo");
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Add Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              minDate={new Date()}
              className={styles.datePicker}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaMapMarkerAlt className={styles.icon} /> Place
            </label>
            <div className={styles.placeInputContainer}>
              <input
                type="text"
                placeholder="Enter place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className={styles.input}
              />
              <FaLocationArrow className={styles.mapIcon} onClick={() => setShowMap(true)} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaClock className={styles.icon} /> Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FaStickyNote className={styles.icon} /> Text
            </label>
            <textarea
              placeholder="Enter details"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Add Todo
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showMap && <MapModal city={place} onClose={() => setShowMap(false)} />}
    </div>
  );
};

export default ModaleTodo;
