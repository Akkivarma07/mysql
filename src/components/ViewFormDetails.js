// ViewFormDetails.js
import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ToasterComponent from '../components/Toaster';

const ViewFormDetails = () => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Extract id from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/getform/${id}`);
        // const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/viewforms`);

        setFormData({
            ...response.data.form,
            selectedSubjects: JSON.parse(response.data.form.selectedSubjects),
          });
          
        setError(null);
      } catch (error) {
        console.error('Error fetching form details:', error);
        setError('Error fetching form details. Please try again.');
      }
    };

    fetchFormDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = () => {
    navigate(`/delete/${id}`);
  };

  if (error) {
    return (
      <div className="container mx-auto mt-8">
        <div className="form-container">
          <p className="error-message text-center">{error}</p>
          <ToasterComponent />
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="container mx-auto mt-8">
        <div className="form-container">
          <p className="text-center">Loading form details...</p>
          <ToasterComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="form-container">
        <h1 className="text-3xl font-bold mb-4 text-center">
          View Form Details
        </h1>

        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{formData.name}</td>
            </tr>
            <tr>
              <td>Mobile:</td>
              <td>{formData.mobile}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{formData.email}</td>
            </tr>
            <tr>
              <td>PRN:</td>
              <td>{formData.prn}</td>
            </tr>
            <tr>
              <td>Subjects:</td>
              <td>{formData.selectedSubjects ? formData.selectedSubjects.join(", ") : ""}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <button className="edit-button" onClick={handleEdit}>
            <FiEdit size={20} /> Edit
          </button>
          <button className="delete-button ml-4" onClick={handleDelete}>
            <FiTrash size={20} /> Delete
          </button>
        </div>

        <ToasterComponent />
      </div>
    </div>
  );
};

export default ViewFormDetails;
