// // DeleteByIdForm.js
// import React, { useState } from 'react';
// import { FiTrash } from 'react-icons/fi';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import ToasterComponent from '../components/Toaster';

// const DeleteByIdForm = () => {
//   const [id, setId] = useState('');
//   const [error, setError] = useState(null);
//   const history = useHistory();

//   const handleInputChange = (e) => {
//     setId(e.target.value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();

//     try {
//       // Validate ID input
//       if (!id.trim()) {
//         throw new Error('Please enter a valid ID.');
//       }

//       const response = await axios.delete('http://localhost:4000/api/deleteform', { data: { id } });

//       if (response.success) {
//         setError(null);
//         history.push('/'); // Redirect to home or any other route after successful delete
//       } else {
//         throw new Error(response.message || 'Delete failed.');
//       }
//     } catch (error) {
//       setError(error.message || 'Delete failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="form-container">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           Delete Form by ID
//         </h1>

//         <form onSubmit={handleDelete} className="space-y-4">
//           <div>
//             <label className="block mb-1">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={id}
//               onChange={handleInputChange}
//               className="input-field"
//               required
//             />
//           </div>

//           <button type="submit" className="delete-button">
//             <FiTrash size={20} /> Delete
//           </button>

//           {error && <p className="error-message text-center">{error}</p>}
//         </form>

//         <ToasterComponent />
//       </div>
//     </div>
//   );
// };

// export default DeleteByIdForm;
// // DeleteByIdForm.js
// import React, { useState } from 'react';
// import { FiTrash } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';  // Import useHistory from react-router-dom
// import axios from 'axios';
// import ToasterComponent from '../components/Toaster';


// const DeleteByIdForm = () => {
//   const [id, setId] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();  // Use the useHistory hook

//   const handleInputChange = (e) => {
//     setId(e.target.value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();

//     try {
//       // Validate ID input
//       if (!id.trim()) {
//         throw new Error('Please enter a valid ID.');
//       }

//       const response = await axios.delete('http://localhost:4000/api/deleteform', { data: { id } });
//       console.log(id);
//       console.log(response);

//       if (response.success) {
//         setError(null);
//         navigate('/'); // Redirect to home or any other route after successful delete
//       } else {
//         throw new Error(response.message || 'Delete failed.');
//       }
//     } catch (error) {
//       setError(error.message || 'Delete failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="form-container">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           Delete Form by ID
//         </h1>

//         <form onSubmit={handleDelete} className="space-y-4">
//           <div>
//             <label className="block mb-1">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={id}
//               onChange={handleInputChange}
//               className="input-field"
//               required
//             />
//           </div>

//           <button type="submit" className="delete-button">
//             <FiTrash size={20} /> Delete
//           </button>

//           {error && <p className="error-message text-center">{error}</p>}
//         </form>

//         <ToasterComponent />
//       </div>
//     </div>
//   );
// };

// export default DeleteByIdForm;
// import React, { useState, useEffect } from 'react';
// import { FiTrash } from 'react-icons/fi';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ToasterComponent from '../components/Toaster';

// const DeleteByIdForm = () => {
//   const { id } = useParams(); // Use the useParams hook to get the ID from the URL
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

//   const handleDelete = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.delete(`http://localhost:4000/api/deleteform/${id}`);

//       if (response.data.success) {
//         setError(null);
//         navigate('/register'); // Redirect to home or any other route after successful delete
//       } else {
//         throw new Error(response.data.message || 'Delete failed.');
//       }
//     } catch (error) {
//       setError(error.message || 'Delete failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="form-container">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           Delete Form by ID
//         </h1>

//         <form onSubmit={handleDelete} className="space-y-4">
//           <div>
//             <label className="block mb-1">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={id}
//               readOnly
//               className="input-field"
//               required
//             />
//           </div>

//           <button type="submit" className="delete-button">
//             <FiTrash size={20} /> Delete
//           </button>

//           {error && <p className="error-message text-center">{error}</p>}
//         </form>

//         <ToasterComponent />
//       </div>
//     </div>
//   );
// };

// export default DeleteByIdForm;
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import react-hot-toast
import ToasterComponent from '../components/Toaster';

const DeleteByIdForm = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}api/deleteform/${id}`);

      if (response.data.success) {
        setError(null);
        navigate('/register');
        // Show success toast
        toast.success('Form deleted successfully', {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        throw new Error(response.data.message || 'Delete failed.');
      }
    } catch (error) {
      setError(error.message || 'Delete failed. Please try again.');
      // Show error toast
      toast.error('Delete failed. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="form-container">
        <h1 className="text-3xl font-bold mb-4 text-center">Delete Form by ID</h1>

        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block mb-1">ID:</label>
            <input type="text" name="id" value={id} readOnly className="input-field" required />
          </div>

          <button type="submit" className="delete-button">
            <FiTrash size={20} /> Delete
          </button>

          {error && <p className="error-message text-center">{error}</p>}
        </form>

        <ToasterComponent />
      </div>
    </div>
  );
};

export default DeleteByIdForm;

