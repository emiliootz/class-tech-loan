import React from "react";

const jsxProtected = ({ name }) => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav
        className="navbar navbar-light"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          Welcome, {name}
        </span>
        <a href="/cart">
          <button className="btn btn-primary">View Cart</button>
        </a>
      </nav>

      {/* Greeting Content */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Greetings, {name}!</h1>
        <a href="/logout">
          <button className="btn btn-danger mt-3">Logout</button>
        </a>
      </div>
    </div>
  );
};

export default jsxProtected;
