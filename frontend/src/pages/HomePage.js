import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Sports Infrastructure Management System</h1>
        <p>
          Your one-stop solution for managing sports facilities efficiently and
          effectively.
        </p>
      </header>
      <section className="home-content">
        <div className="home-card">
          <h2>Manage Facilities</h2>
          <p>List and manage all your sports facilities in one place.</p>
        </div>
        <div className="home-card">
          <h2>Booking System</h2>
          <p>Easily book and manage reservations for your facilities.</p>
        </div>
        <div className="home-card">
          <h2>Maintenance Management</h2>
          <p>
            Schedule and track maintenance activities to keep facilities in top
            condition.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
