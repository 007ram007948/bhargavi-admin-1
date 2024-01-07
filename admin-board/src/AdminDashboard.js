// AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch registered users
    axios.get("https://amaranth-lobster-robe.cyclic.app/api/users").then((response) => {
      setUsers(response.data);
    });

    // Fetch contact form submissions
    axios.get("https://amaranth-lobster-robe.cyclic.app/api/contacts").then((response) => {
      setContacts(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="mb-4 p-4 border border-gray-300 rounded shadow"
          >
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}, <strong>Age:</strong> {user.age},{" "}
            <strong>Phone:</strong> {user.phoneNumber}, <strong>Gender:</strong>{" "}
            {user.gender}, <strong>Message:</strong> {user.message}
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold my-8">Contact Form Submissions</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="mb-4 p-4 border border-gray-300 rounded shadow"
          >
            <strong>Full Name:</strong> {contact.fullName},{" "}
            <strong>Email:</strong> {contact.email}, <strong>Phone:</strong>{" "}
            {contact.phone}, <strong>Message:</strong> {contact.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
