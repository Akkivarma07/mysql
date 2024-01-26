import React, { useState } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import ToasterComponent from "../components/Toaster";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library

import "../style.css";

const subjectsList = [
  "ADS",
  "Machine Learning",
  "Cloud Computing",
  "Soft Computing",
  "iOS",
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    prn: "",
    selectedSubjects: [],
    otherSubject: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        selectedSubjects: checked
          ? [...prevData.selectedSubjects, value]
          : prevData.selectedSubjects.filter((subject) => subject !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateFormData();

      const response = await submitFormToServer(formData);

      if (response.success) {
        toast.success("Registration successful!", {
          icon: <FiCheckCircle size={24} color="#10B981" />,
        });
        resetForm();
        setError(null);
      } else {
        throw new Error(response.message || "Registration failed.");
      }
    } catch (error) {
      if (error.message === "At least one subject must be selected.") {
        toast.error(error.message, {
          icon: <FiAlertCircle size={24} color="#EF4444" />,
        });
      } else {
        handleFormError(error);
      }
    }
  };

  const validateFormData = () => {
    if (!formData.name.trim()) {
      throw new Error("Name is required.");
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      throw new Error("Mobile number must be a 10-digit number.");
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      throw new Error("Invalid email address.");
    }

    if (!formData.prn.trim()) {
      throw new Error("PRN is required.");
    }

    if (formData.selectedSubjects.length === 0) {
      throw new Error("At least one subject must be selected.");
    }

    if (
      formData.selectedSubjects.includes("Other") &&
      !formData.otherSubject.trim()
    ) {
      throw new Error("Please specify the new subject.");
    }
  };

  //   const submitFormToServer = async (data) => {
  //     try {
  //       console.log('Sending data to server:', data);
  //       const response = await axios.post('http://localhost:4000/api/registerform', data);
  //       console.log('Server response:', response);
  //       return response.data;
  //     } catch (error) {
  //       console.error('Error submitting form:', error);
  //       throw error.response?.data || { success: false, message: 'Server error' };
  //     }
  //   };
  const submitFormToServer = async (data) => {
    try {
      // Stringify the selectedSubjects array
      data.selectedSubjects = JSON.stringify(data.selectedSubjects);

      console.log("Sending data to server:", data);
      const response = await axios.post(
        "http://localhost:4000/api/registerform",
        data
      );
      console.log("Server response:", response);
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error.response?.data || { success: false, message: "Server error" };
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      email: "",
      prn: "",
      selectedSubjects: [],
      otherSubject: "",
    });
  };

  const handleFormError = (error) => {
    setError(error.message || "Registration failed. Please try again.");
    toast.error(error.message || "Registration failed. Please try again.", {
      icon: <FiAlertCircle size={24} color="#EF4444" />,
    });
  };

  // const handlesubmit = () => {
  //   navigate(`/`);
  // };

  return (
    <div className="container mx-auto mt-8">
      <div className="form-container">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Exam Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              PRN (Personal Registration Number):
            </label>
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Select Exam Subjects:</label>
            <div className="flex flex-wrap gap-4 subjects-container">
              {subjectsList.map((subject) => (
                <div key={subject} className="subject-item">
                  <input
                    type="checkbox"
                    id={subject}
                    name="selectedSubjects"
                    value={subject}
                    checked={formData.selectedSubjects.includes(subject)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={subject} className="subject-label">
                    {subject}
                  </label>
                </div>
              ))}
              <div className="subject-item">
                <input
                  type="checkbox"
                  id="Other"
                  name="selectedSubjects"
                  value="Other"
                  checked={formData.selectedSubjects.includes("Other")}
                  onChange={handleInputChange}
                />
                <label htmlFor="Other" className="subject-label">
                  Other
                </label>
                {formData.selectedSubjects.includes("Other") && (
                  <input
                    type="text"
                    name="otherSubject"
                    value={formData.otherSubject}
                    onChange={handleInputChange}
                    placeholder="Specify other subject"
                    className="input-field ml-2"
                    required
                  />
                )}
              </div>
            </div>
          </div>
          <ToasterComponent />

          <button
            type="submit"
            className="submit-button"
            // onClick={handlesubmit}
          >
            Submit
          </button>
        </form>

        {error && <p className="error-message text-center">{error}</p>}
      </div>
      <NavLink to="/update">
        <button>Go to Update Form</button>
      </NavLink>
      <NavLink to="/">
        <button >Go to Home</button>
      </NavLink>
    </div>
  );
};

export default RegistrationForm;
