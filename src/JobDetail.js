// src/JobDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}/`).then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700">
        {job.company_name} – {job.location}
      </p>
      <p className="mt-4">{job.description}</p>
      <div className="mt-6 flex gap-2">
        <Link
          to={`/edit/${job.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <Link to="/" className="bg-gray-300 px-4 py-2 rounded">
          Back
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
