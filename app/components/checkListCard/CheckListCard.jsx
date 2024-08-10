import React, { useState } from "react";
import styles from "./CheckListCard.module.scss";
import { FaTrash, FaEdit } from "react-icons/fa";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const CheckListCard = ({ todo }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const editTodo = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const todoEditData = {
      date: todo.date,
      time: todo.time,
      place: todo.place,
      text: todo.text,
    };

    try {
      const response = await fetch(`/api/todo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoEditData),
      });
      if (!response.ok) {
        throw new Error("Check item not modified!");
      }
      setIsActive(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteTodo = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/todo/${todo._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Check item not deleted!");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.checkItem}>
      {isActive ? (
        <form onSubmit={editTodo} className={styles.form}>
          <input
            type="date"
            defaultValue={new Date(todo.date).toISOString().split("T")[0]}
            onChange={(e) => (todo.date = e.target.value)}
            className={styles.input}
          />
          <input
            type="time"
            defaultValue={todo.time}
            onChange={(e) => (todo.time = e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            defaultValue={todo.place}
            onChange={(e) => (todo.place = e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            defaultValue={todo.text}
            onChange={(e) => (todo.text = e.target.value)}
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
          <h2 className={styles.title}>Date: {new Date(todo.date).toLocaleDateString()}</h2>
          <p className={styles.details}>Time: {todo.time}</p>
          <p className={styles.details}>Place: {todo.place}</p>
          <p className={styles.details}>Text: {todo.text}</p>
        </>
      )}
      <div className={styles.todoActions}>
        <FaEdit className={styles.icon} onClick={handleActive} />
        {!isActive && <FaTrash className={styles.icon} onClick={deleteTodo} />}
      </div>
    </div>
  );
};

export default CheckListCard;
