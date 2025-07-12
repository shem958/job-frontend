// src/JobList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const deactivateJob = (id) => {
    api
      .patch(`/jobs/${id}/deactivate/`)
      .then(() => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      })
      .catch((err) => console.error("Error deactivating job:", err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Link to={`/jobs/${job.id}`}>
                    <h2 className="text-xl font-semibold text-blue-700 hover:underline">
                      {job.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {job.company_name} – {job.location}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/edit/${job.id}`}
                    className="text-yellow-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deactivateJob(job.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
