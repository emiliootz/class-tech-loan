import React, { useState, useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { ItemModel } from "../config/database";

const jsxEquipment = ({ name, items }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const buildingsList = new Map([
    ["Select a Building", ""],
    ["McCormack", "mccormack"],
    ["University Hall", "uhall"],
    ["Wheately", "wheately"],
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState(buildingsList[0]);

  const [filteredItems, setFilteredItems] = useState(() => {
    return items.filter((item) =>
      item.assetType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Navigation Bar */}
      <nav
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
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            View Cart
          </button>
        </a>
        {/* Logout Button */}
        <a href="/logout">
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </a>
      </nav>

      {/* Settings Container */}
      <Container style={{ marginTop: "10vh" }}>
        <Row style={{ marginBottom: "10px", alignItems: "center" }}>
          {/* Building Dropdown */}
          <Col
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
            xs={12}
            md={2}
          >
            <Form.Select
              aria-label="Building Select"
              onChange={(e) => setSelectedBuilding(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            >
              {Array.from(buildingsList.keys()).map((building, index) => (
                <option key={index}>{building}</option>
              ))}
            </Form.Select>
          </Col>

          {/* Search Bar */}
          <Col
            xs={12}
            md={4}
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search by Name...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </Col>
        </Row>
      </Container>

      {/* Items List */}
      <Container style={{ paddingTop: "30px" }}>
        <h1 style={{ textAlign: "center" }}>Available Items</h1>
        <Row
          style={{
            paddingTop: "20px",
            display: "flex",
            height: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <a
                href={`/item/${item._id}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  maxWidth: "33%",
                  marginLeft: "10vw",
                }} // Ensure <a> behaves as block-level element
                key={item._id}
              >
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    justifyContent: "center",
                    maxWidth: "33%",
                  }}
                >
                  <Card
                    style={{
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease-in-out",
                      maxWidth: "50vw",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"; // Scale up card on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"; // Reset scale when hover ends
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      style={{
                        maxWidth: "25vw",
                        maxHeight: "45vh",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title>
                        {item.assetType} - {item.make} {item.model}
                      </Card.Title>
                      <Card.Text>Quantity: 1</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </a>
            ))
          ) : (
            <Col xs={12}>
              <p style={{ textAlign: "center" }}>No items found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default jsxEquipment;
