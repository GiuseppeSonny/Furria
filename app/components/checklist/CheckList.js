import React from "react";
import styles from "./checklist.module.scss";
import CheckListCard from "../checkListCard/CheckListCard";

const CheckList = ({ list = [] }) => {
  const sortedTodos = list.sort((a, b) => {
    const dateTimeA = new Date(`${a.date.split("T")[0]}T${a.time}:00`);
    const dateTimeB = new Date(`${b.date.split("T")[0]}T${b.time}:00`);
    return dateTimeA - dateTimeB;
  });

  
  return (
    <ul className={styles.checkList}>
      {sortedTodos.map((todo) => (
        <CheckListCard key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default CheckList;
