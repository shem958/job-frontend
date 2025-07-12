// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./JobList";
import JobForm from "./JobForm";
import JobDetail from "./JobDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add" element={<JobForm />} />
        <Route path="/edit/:id" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
