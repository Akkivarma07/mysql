import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-8xl font-bold mb-4 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/viewall" className="card card-view-all">
          <h2 className="text-xl font-bold mb-2 bg-slate-100">View All Forms</h2>
          <p>View details of all submitted forms.</p>
        </Link>


        <Link to="/register" className="card card-register-form">
          <h2 className="text-xl font-bold  mb-2">Register Form</h2>
          <p>Register a new form with your details.</p>
        </Link>
        <Link to="/view/" className="card card-view-by-id">
          <h2 className="text-xl font-bold mb-2">View Form by ID</h2>
          <p>View details of a form by entering its ID.</p>
        </Link>

        {/* <Link to="/update-form" className="card card-update-form">
          <h2 className="text-xl font-bold mb-2">Update Form</h2>

        </Link> */}
        {/* Card 4: Add other links as needed */}
        {/* <Link to="/other-link" className="card">
          <h2 className="text-xl font-bold mb-2">Other Link</h2>
          <p>Description of the other link.</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Dashboard;
