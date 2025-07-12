// src/JobForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

const JobForm = () => {
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    location: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/jobs/${id}/`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/jobs/${id}/`, form)
      : api.post("/jobs/", form);
    request.then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{id ? "Edit Job" : "Add Job"}</h1>
      {["title", "company_name", "location", "description"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block mb-1 capitalize">
            {field.replace("_", " ")}
          </label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default JobForm;
