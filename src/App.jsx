import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import TaskSorter from "./components/TaskSorter/TaskSorter";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-sorter" element={<TaskSorter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
