import React from "react";
import TicketCard from "../TicketCard/TicketCard.jsx";
import styles from "./Board.module.css";
import TodoIcon from "../../assets/icons_FEtask/To-do.svg";
import BacklogIcon from "../../assets/icons_FEtask/Backlog.svg";
import InProgressIcon from "../../assets/icons_FEtask/in-progress.svg";
import CancelledIcon from "../../assets/icons_FEtask/Cancelled.svg";
import DoneIcon from "../../assets/icons_FEtask/Done.svg";

import Menu from "../../assets/icons_FEtask/3 dot menu.svg";
import AddIcon from "../../assets/icons_FEtask/add.svg";

import HighIcon from "../../assets/icons_FEtask/Img - High Priority.svg";
import LowIcon from "../../assets/icons_FEtask/Img - Low Priority.svg";
import MediumIcon from "../../assets/icons_FEtask/Img - Medium Priority.svg";
import NoPriorityIcon from "../../assets/icons_FEtask/No-priority.svg";
import UrgentIcon from "../../assets/icons_FEtask/SVG - Urgent Priority colour.svg";

const statusIcons = {
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Done: DoneIcon,
  Backlog: BacklogIcon,
  Cancelled: CancelledIcon,
};

const priorityIcons = {
  Urgent: UrgentIcon,
  High: HighIcon,
  Medium: MediumIcon,
  Low: LowIcon,
  "No priority": NoPriorityIcon,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const Board = ({ tickets, users, grouping, ordering }) => {
  const groupTickets = (tickets, grouping, users) => {
    const groups = {};

    if (grouping === "user") {
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      tickets.forEach((ticket) => {
        const user = userMap[ticket.userId] || { name: "Unassigned" };
        const userName = user.name === "Unassigned" ? null : user.name;
        if (userName) {
          if (!groups[userName]) groups[userName] = { tickets: [], user };
          groups[userName].tickets.push(ticket);
        }
      });
    } else if (grouping === "status") {
      const validStatuses = [
        "Todo",
        "In progress",
        "Backlog",
        "Done",
        "Cancelled",
      ];

      validStatuses.forEach((status) => {
        groups[status] = { tickets: [] };
      });

      tickets.forEach((ticket) => {
        const groupKey = ticket.status || "Unassigned";
        if (!groups[groupKey]) groups[groupKey] = { tickets: [] };
        groups[groupKey].tickets.push(ticket);
      });
    } else if (grouping === "priority") {
      const validPriorities = [
        "Urgent",
        "High",
        "Medium",
        "Low",
        "No priority",
      ];

      validPriorities.forEach((priority) => {
        groups[priority] = { tickets: [] };
      });

      tickets.forEach((ticket) => {
        const groupKey =
          ticket.priority !== undefined
            ? ticket.priority === 4
              ? "Urgent"
              : ticket.priority === 3
              ? "High"
              : ticket.priority === 2
              ? "Medium"
              : ticket.priority === 1
              ? "Low"
              : "No priority"
            : "No priority";
        if (!groups[groupKey]) groups[groupKey] = { tickets: [] };
        groups[groupKey].tickets.push(ticket);
      });
    } else {
      tickets.forEach((ticket) => {
        const groupKey = ticket[grouping] || "Unassigned";
        if (!groups[groupKey]) groups[groupKey] = { tickets: [] };
        groups[groupKey].tickets.push(ticket);
      });
    }

    return groups;
  };

  const groupedTickets = groupTickets(tickets, grouping, users);

  const sortTickets = (groupedTickets, ordering) => {
    const sorted = {};
    Object.keys(groupedTickets).forEach((group) => {
      sorted[group] = groupedTickets[group].tickets.sort((a, b) => {
        if (ordering === "priority") return b.priority - a.priority;
        if (ordering === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    });
    return sorted;
  };

  const sortedTickets = sortTickets(groupedTickets, ordering);

  const getUserInitials = (name) => {
    if (!name) return "UN";
    const splitName = name.split(" ");
    return (
      splitName[0][0].toUpperCase() +
      (splitName[1] ? splitName[1][0].toUpperCase() : "")
    );
  };

  const getUserColor = (name) => {
    if (!name) return "#cccccc";
    const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 60%, 70%)`;
    return color;
  };

  return (
    <div className={styles.kanbanBoard}>
      {Object.keys(sortedTickets).map((group) => (
        <div className={styles.kanbanColumn} key={group}>
          <h3 className={styles.columnHeader}>
            <span className={styles.headerTitle}>
              {statusIcons[group] && (
                <img
                  src={statusIcons[group]}
                  alt={`${group} Icon`}
                  className={styles.statusIcon}
                />
              )}
              {grouping === "user" && (
                <div
                  className={styles.userInitials}
                  style={{
                    backgroundColor: getUserColor(group),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: 650,
                    marginRight: "5px",
                  }}
                >
                  {getUserInitials(group)}
                </div>
              )}
              {grouping === "priority" && priorityIcons[group] && (
                <img
                  src={priorityIcons[group]}
                  alt={`${priorityLabels[group]} Icon`}
                  className={styles.priorityIcon}
                />
              )}
              {group} ({sortedTickets[group].length})
            </span>
            <span className={styles.headerIcons}>
              <img src={AddIcon} alt="Add Icon" className={styles.addIcon} />
              <img src={Menu} alt="Menu Icon" className={styles.menuIcon} />
            </span>
          </h3>

          {sortedTickets[group].map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              users={users}
              isGroupedByUser={grouping === "user"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
