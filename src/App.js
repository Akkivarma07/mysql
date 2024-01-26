// import React from 'react';
// import RegistrationForm from './components/RegistrationForm';

// const App = () => {
//   return (
//     <div className="container mx-auto mt-8">
//       <RegistrationForm />
//     </div>
//   );
// };

// export default App;
// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../src/components/Navigation";
import RegistrationForm from "../src/components/RegistrationForm";
import UpdateRegistrationForm from "../src/components/UpdateRegistrationForm";
import DeleteByIdForm from "../src/components/DeleteByIdForm";
import ViewFormDetails from "../src/components/ViewFormDetails";
import ViewAllForm from "../src/components/ViewAllForm";
import Dashboard from "../src/components/Dashboard";

function App() {
  return (
    <Router>
      {/* Other components or layout elements can go here */}

      {/* Define your routes using Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/update/:id" element={<UpdateRegistrationForm />} />
        <Route path="/delete/:id" element={<DeleteByIdForm />} />
        <Route path="/view/:id" element={<ViewFormDetails />} />
        <Route path="/viewall" element={<ViewAllForm />} />
        {/* Add other routes as needed */}
      </Routes>

      {/* Other components or layout elements can go here */}
    </Router>
  );
}

export default App;
