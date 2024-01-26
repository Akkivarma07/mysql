import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style.css";
import { NavLink, useNavigate } from "react-router-dom";

const ViewAllForms = () => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/viewforms');
        setForms(response.data.forms);
        setError(null);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setError('Error fetching forms. Please try again.');
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">View All Forms</h1>

      {error && <p className="error-message text-center">{error}</p>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>PRN</th>
              <th>Subjects</th>
              <th>Other Subject</th>
              {/* <th>Created At</th>
              <th>Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.id}</td>
                <td>{form.name}</td>
                <td>{form.mobile}</td>
                <td>{form.email}</td>
                <td>{form.prn}</td>
                <td>{JSON.parse(form.selectedSubjects).join(', ')}</td>
                <td>{form.otherSubject}</td>
                {/* <td>{form.created_at}</td>
                <td>{form.updated_at}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavLink to="/">
        <button >Go to Home</button>
      </NavLink>
    </div>
  );
};

export default ViewAllForms;
