import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { Form, NavLink, useParams } from "react-router-dom";
import ToasterComponent from "./Toaster";

const subjectsList = [
  "ADS",
  "Machine Learning",
  "Cloud Computing",
  "Soft Computing",
  "iOS",
];

const UpdateRegistrationForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    prn: "",
    selectedSubjects: [],
    otherSubject: "",
  });

  const [error, setError] = useState(null);
  const [mode, setMode] = useState("view"); // "view" or "edit"

  const { id } = useParams();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getform/${id}`
        );
        const formDetails = response.data.form;
        console.log(formDetails);
        console.log(formData);

        setFormData({
          id: formDetails.id,
          name: formDetails.name,
          mobile: formDetails.mobile,
          email: formDetails.email,
          prn: formDetails.prn,
          selectedSubjects: JSON.parse(formDetails.selectedSubjects),
        });
        
        console.log(formDetails.id);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setError("Error fetching form details. Please try again.");
      }
    };

    fetchFormDetails();
  }, [id]);

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

      // Prepare data for server update
      const updateData = {
        id: formData.id,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        prn: formData.prn,
        selectedSubjects: JSON.stringify(formData.selectedSubjects),
        otherSubject: formData.otherSubject || null,
      };

      const response = await submitFormToServer(updateData);

      if (response.success) {
        toast.success("Update successful!", {
          icon: <FiCheckCircle size={24} color="#10B981" />,
        });
        setError(null);

        // After successful update, switch back to "view" mode
        setMode("view");
      } else {
        throw new Error(response.message || "Update failed.");
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

  const submitFormToServer = async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/editform",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error.response?.data || { success: false, message: "Server error" };
    }
  };

  const handleFormError = (error) => {
    setError(error.message || "Update failed. Please try again.");
    toast.error(error.message || "Update failed. Please try again.", {
      icon: <FiAlertCircle size={24} color="#EF4444" />,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="form-container">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {mode === "view" ? "View" : "Update"} Registration Form
        </h1>

        {mode === "view" && (
          // Display existing data in a table
          <div>
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
                  <td> {formData.selectedSubjects ? formData.selectedSubjects.join(", ") : ""}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setMode("edit")}>Edit</button>
          </div>
        )}

        {mode === "edit" && (
          // Display form fields for editing
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

            <button type="submit" className="submit-button">
              Update
            </button>
            <button type="button" onClick={() => setMode("view")}>
              Cancel
            </button>
          </form>
        )}

        {error && <p className="error-message text-center">{error}</p>}
      </div>
      {/* Button to navigate back to the registration form */}
      <NavLink to="/register">
        <button>Go to Registration Form</button>
      </NavLink>

      <ToasterComponent />
    </div>
  );
};

export default UpdateRegistrationForm;

// import React, { useState, useEffect } from 'react';
// import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { NavLink, useParams } from 'react-router-dom';
// import ToasterComponent from './Toaster';

// const subjectsList = [
//   'ADS',
//   'Machine Learning',
//   'Cloud Computing',
//   'Soft Computing',
//   'iOS',
// ];

// const UpdateRegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     mobile: '',
//     email: '',
//     prn: '',
//     selectedSubjects: [],
//     otherSubject: '',
//   });

//   const [error, setError] = useState(null);
//   const [mode, setMode] = useState('view'); // "view" or "edit"

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchFormDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/getform/${id}`
//         );
//         const formDetails = response.data.form;

//         setFormData({
//           id: formDetails.id,
//           name: formDetails.name,
//           mobile: formDetails.mobile,
//           email: formDetails.email,
//           prn: formDetails.prn,
//           selectedSubjects: JSON.parse(formDetails.selectedSubjects),
//         });
//       } catch (error) {
//         console.error('Error fetching form details:', error);
//         setError('Error fetching form details. Please try again.');
//       }
//     };

//     fetchFormDetails();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox') {
//       setFormData((prevData) => ({
//         ...prevData,
//         selectedSubjects: checked
//           ? [...prevData.selectedSubjects, value]
//           : prevData.selectedSubjects.filter((subject) => subject !== value),
//       }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       validateFormData();

//       // Prepare data for server update
//       const updateData = {
//         id: formData.id,
//         name: formData.name,
//         mobile: formData.mobile,
//         email: formData.email,
//         prn: formData.prn,
//         selectedSubjects: JSON.stringify(formData.selectedSubjects),
//         otherSubject: formData.otherSubject || null,
//       };

//       const response = await submitFormToServer(updateData);

//       if (response.success) {
//         toast.success('Update successful!', {
//           icon: <FiCheckCircle size={24} color="#10B981" />,
//         });
//         setError(null);

//         // After successful update, switch back to "view" mode
//         setMode('view');
//       } else {
//         throw new Error(response.message || 'Update failed.');
//       }
//     } catch (error) {
//       if (error.message === 'At least one subject must be selected.') {
//         toast.error(error.message, {
//           icon: <FiAlertCircle size={24} color="#EF4444" />,
//         });
//       } else {
//         handleFormError(error);
//       }
//     }
//   };

//   const validateFormData = () => {
//     if (!formData.name.trim()) {
//       throw new Error('Name is required.');
//     }

//     if (!/^\d{10}$/.test(formData.mobile)) {
//       throw new Error('Mobile number must be a 10-digit number.');
//     }

//     if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
//       throw new Error('Invalid email address.');
//     }

//     if (!formData.prn.trim()) {
//       throw new Error('PRN is required.');
//     }

//     if (formData.selectedSubjects.length === 0) {
//       throw new Error('At least one subject must be selected.');
//     }

//     if (
//       formData.selectedSubjects.includes('Other') &&
//       !formData.otherSubject.trim()
//     ) {
//       throw new Error('Please specify the new subject.');
//     }
//   };

//   const submitFormToServer = async (data) => {
//     try {
//       const response = await axios.put(
//         'http://localhost:4000/api/editform',
//         data
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       throw error.response?.data || { success: false, message: 'Server error' };
//     }
//   };

//   const handleFormError = (error) => {
//     setError(error.message || 'Update failed. Please try again.');
//     toast.error(error.message || 'Update failed. Please try again.', {
//       icon: <FiAlertCircle size={24} color="#EF4444" />,
//     });
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="form-container">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           {mode === 'view' ? 'View' : 'Update'} Registration Form
//         </h1>

//         {mode === 'view' && (
//           // Display existing data in a table
//           <div>
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Name:</td>
//                   <td>{formData.name}</td>
//                 </tr>
//                 <tr>
//                   <td>Mobile:</td>
//                   <td>{formData.mobile}</td>
//                 </tr>
//                 <tr>
//                   <td>Email:</td>
//                   <td>{formData.email}</td>
//                 </tr>
//                 <tr>
//                   <td>PRN:</td>
//                   <td>{formData.prn}</td>
//                 </tr>
//                 <tr>
//                   <td>Subjects:</td>
//                   <td>
//                     {' '}
//                     {formData.selectedSubjects
//                       ? formData.selectedSubjects.join(', ')
//                       : ''}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <button onClick={() => setMode('edit')}>Edit</button>
//           </div>
//         )}

//         {mode === 'edit' && (
//           // Display form fields for editing
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1">Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="input-field"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1">Mobile:</label>
//               <input
//                 type="tel"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleInputChange}
//                 className="input-field"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="input-field"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1">
//                 PRN (Personal Registration Number):
//               </label>
//               <input
//                 type="text"
//                 name="prn"
//                 value={formData.prn}
//                 onChange={handleInputChange}
//                 className="input-field"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1">Select Exam Subjects:</label>
//               <div className="flex flex-wrap gap-4 subjects-container">
//                 {subjectsList.map((subject) => (
//                   <div key={subject} className="subject-item">
//                     <input
//                       type="checkbox"
//                       id={subject}
//                       name="selectedSubjects"
//                       value={subject}
//                       checked={formData.selectedSubjects.includes(subject)}
//                       onChange={handleInputChange}
//                     />
//                     <label htmlFor={subject} className="subject-label">
//                       {subject}
//                     </label>
//                   </div>
//                 ))}
//                 <div className="subject-item">
//                   <input
//                     type="checkbox"
//                     id="Other"
//                     name="selectedSubjects"
//                     value="Other"
//                     checked={formData.selectedSubjects.includes('Other')}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="Other" className="subject-label">
//                     Other
//                   </label>
//                   {formData.selectedSubjects.includes('Other') && (
//                     <input
//                       type="text"
//                       name="otherSubject"
//                       value={formData.otherSubject}
//                       onChange={handleInputChange}
//                       placeholder="Specify other subject"
//                       className="input-field ml-2"
//                       required
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <button type="submit" className="submit-button">
//               Update
//             </button>
//             <button type="button" onClick={() => setMode('view')}>
//               Cancel
//             </button>
//           </form>
//         )}

//         {error && (
//           <p className="error-message text-center">{error}</p>
//         )}
//       </div>
//       {/* Button to navigate back to the registration form */}
//       <NavLink to="/register">
//         <button>Go to Registration Form</button>
//       </NavLink>

//       <ToasterComponent />
//     </div>
//   );
// };

// // New Component for Deleting a form by ID
// const DeleteByIdForm = () => {
//   const [idToDelete, setIdToDelete] = useState('');
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     setIdToDelete(e.target.value);
//   };

//   const handleDelete = async () => {
//     try {
//       // Validate if ID is provided
//       if (!idToDelete.trim()) {
//         throw new Error('Please provide a valid ID.');
//       }

//       const response = await axios.delete(
//         `http://localhost:4000/api/deleteform/${idToDelete}`
//       );

//       if (response.success) {
//         toast.success('Deletion successful!', {
//           icon: <FiCheckCircle size={24} color="#10B981" />,
//         });
//         setError(null);
//       } else {
//         throw new Error(response.message || 'Deletion failed.');
//       }
//     } catch (error) {
//       setError(error.message || 'Deletion failed. Please try again.');
//       toast.error(error.message || 'Deletion failed. Please try again.', {
//         icon: <FiAlertCircle size={24} color="#EF4444" />,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="form-container">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           Delete Form by ID
//         </h1>

//         <div>
//           <label className="block mb-1">Enter Form ID to Delete:</label>
//           <input
//             type="text"
//             value={idToDelete}
//             onChange={handleInputChange}
//             className="input-field"
//             required
//           />
//         </div>

//         <button onClick={handleDelete} className="submit-button">
//           Delete
//         </button>

//         {error && (
//           <p className="error-message text-center">{error}</p>
//         )}
//       </div>

//       <ToasterComponent />
//     </div>
//   );
// };

// export default{ UpdateRegistrationForm, DeleteByIdForm };
