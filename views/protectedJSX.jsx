import React from "react";

const jsxProtected = ({ name }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Greetings, {name}</h1>
      <a href="logout">Logout</a>
    </div>
  );
}

export default jsxProtected;