import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import TaskSorter from "../TaskSorter/TaskSorter";
import styles from "./Home.module.css";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched Data:", data);

        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        }

        if (Array.isArray(data.users)) {
          setUsers(data.users);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (tickets.length === 0) return <div>No tickets available</div>;

  return (
    <div className={styles.home}>
      <TaskSorter setGrouping={setGrouping} setOrdering={setOrdering} />
      <Board
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
}

export default Home;
