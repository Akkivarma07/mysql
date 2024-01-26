// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/register" activeClassName="active-link">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/update" activeClassName="active-link">
            Update
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete" activeClassName="active-link">
           Delete
          </NavLink>
        </li>
        <li>
          <NavLink to="/view" activeClassName="active-link">
           View
          </NavLink>
        </li>
        <li>
          <NavLink to="/viewall" activeClassName="active-link">
           View All
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
