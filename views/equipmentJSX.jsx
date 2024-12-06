import React, { useState, useEffect } from "react";
import { Col, Container, Form } from "react-bootstrap";
import { ItemModel } from "../config/database";

//import { Container } from "react-bootstrap";

const jsxEquipment = ({ name, items }) => {
  // Determines what items should be shown to the user
  // - searchQuery: A textbox where the user can search for items by name
  // - selectedBuilding: A dropdown where the user can select between the buildings available in the data.
  const [searchQuery, setSearchQuery] = useState("");

  const buildingsList = new Map([
    ["Select a Building", ""],
    ["McCormack", "mccormack"],
    ["University Hall", "uhall"],
    ["Wheately", "wheately"],
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState(buildingsList[0]);

  const [filteredItems, setFilteredItems] = useState(() => {
    items.filter((item) =>
      item.assetType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ overflowX: "hidden" }}>
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
        {/* Cart Button */}
        <a href="/cart">
          <button className="btn btn-primary">View Cart</button>
        </a>
        {/* Logout Button */}
        <a href="/logout">
          <button className="btn btn-primary">Logout</button>
        </a>
      </nav>
      {/* Settings Container */}
      <Container>
        {/* Building Dropdown */}
        <Col sx={12} md={2} className={"mb-2"}>
          <Form.Select
            aria-label="Building Select"
            onChange={(e) => setSelectedBuilding(e.target.value)}
          >
            {Array.from(buildingsList.keys()).map((building, index) => (
              <option key={index}>{building}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Search Bar */}
        <Col xs={12} md={4} className={"mb-2"}>
          <Form.Control
            type="text"
            placeholder="Search by Name...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Container>

      {/* Items List */}
      <Container className="pt-3">
        <div style={{ marginTop: "30px", overflowX: "hidden" }}>
          <h1 style={{ textAlign: "center" }}>Available Items</h1>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {items.map((item) => (
              <li
                key={item._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px auto",
                  maxWidth: "600px",
                }}
              >
                <h3>
                  {item.assetType} - {item.make} {item.model}
                </h3>
                <p>
                  <strong>Asset ID:</strong> {item.assetId}
                </p>
                <a href={`/item/${item._id}`}>
                  <button className="btn btn-info">View Details</button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default jsxEquipment;
