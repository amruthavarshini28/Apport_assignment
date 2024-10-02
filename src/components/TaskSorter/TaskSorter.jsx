import React, { useState } from "react";
import DisplayIcon from "../../assets/icons_FEtask/Display.svg";
import styles from "./TaskSorter.module.css";

const TaskSorter = ({ setGrouping, setOrdering }) => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("priority");

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    setSelectedGrouping(newGrouping);
    setDisplayOnClick(false);
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setOrdering(newOrdering);
    setSelectedOrdering(newOrdering);
    setDisplayOnClick(false);
  };

  return (
    <div className={styles.sorterContainer}>
      <button
        className={styles.displayButton}
        onClick={() => setDisplayOnClick(!displayOnClick)}
      >
        {" "}
        <img
          src={DisplayIcon}
          alt="Display Icon"
          className={styles.icon}
        />{" "}
        Display
      </button>
      {displayOnClick && (
        <div className={styles.dropdown}>
          <div className={styles.selectGroup}>
            <span>Grouping:</span>
            <select
              onChange={handleGroupingChange}
              className={styles.selectStyle}
              value={selectedGrouping}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className={styles.selectGroup}>
            <span>Ordering:</span>
            <select
              onChange={handleOrderingChange}
              className={styles.selectStyle}
              value={selectedOrdering}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSorter;
