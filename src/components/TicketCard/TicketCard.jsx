import React from "react";
import NoPriorityIcon from "../../assets/icons_FEtask/No-priority.svg";
import styles from "./TicketCard.module.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TicketCard = ({ ticket, users, isGroupedByUser }) => {
  const user = users ? users.find((u) => u.id === ticket.userId) : null;
  const userName = user ? user.name : null;
  const initials = userName ? userName.substring(0, 2).toUpperCase() : "UN";
  const backgroundColor = getRandomColor();

  return (
    <div className={styles.ticketCard}>
      <div className={styles.ticketHeader}>
        <span className={styles.ticketId}>{ticket.id}</span>
        {!isGroupedByUser && (
          <div
            className={styles.userAvatar}
            style={{
              backgroundColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "30px",
              height: "34px",
              color: "white",
              fontWeight: 650,
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <h2 className={styles.ticketTitle}>{ticket.title}</h2>
      <div className={styles.ticketMeta}>
        <div className={styles.priorityBadge}>
          <img src={NoPriorityIcon} alt="Priority Icon" />
        </div>
        <div className={styles.typeBadge}>
          <span>{ticket.tag.join(", ")}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
