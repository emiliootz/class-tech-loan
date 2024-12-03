// Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';



// Typescript (https://react.dev/learn/typescript)
interface EquipmentPageProps {
    backendURL: string;

}

interface Item {
  _id: string; // MongoDB ObjectId represented as a string
  assetId: string; // Unique identifier for the asset
  assetType: string; // Type of asset, e.g., 'Screen'
  make: string; // Manufacturer of the item
  model: string; // Model of the item
  serialNumber: string; // Serial number of the item
  umbTagNumber: string; // Unique tag number
  status: string; // Current status of the item, e.g., 'Available'
  location: string; // Location where the item is stored, e.g., 'mccormack'
  description: string; // Item description, defaults to 'No description available'
  dateAdded: Date; // Date when the item was added
  archived: boolean; // Indicates if the item is archived
}

/**
 * This component is the page where the user can:
 * - View all items available to be loaned
 * - See basic item information, such as an Item's...
 *    - Picture
 *    - Name
 *    - Amount Available
 * - Filter items that are shown via the searchQuery
 * - Filter items that are shown by building
 * - See their User ID and Email
 * - Click each Item to view more information (Calls the Item.jsx component for that specific item)
 * - Click the Cart Button (calls the Item.jsx component)
 * - Logout (Not implemented currently)
 * 
 * @returns React Component
 */
function EquipmentPage( {backendURL} ) {

    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const buildings: string[] = [
      'McCormack',
      'University Hall',
      'Wheatley'
    ];

    useEffect(() => {
      const fetchItems = async () => {
        try {
          console.log(`${backendURL}/items`);
          const response = await axios.get<Item[]>(`${backendURL}/items`);
          setItems(response.data);
          console.log(items);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      fetchItems();
    }, []);


  const filteredItems = items.filter(item =>
    item.assetType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/view-item/${id}`);
  };

  return (
    <div style={{ overflowX: 'hidden' }}> {/* Prevent horizontal overflow */}
      {/* Top Section Container */}
      <Container className="mt-3">
        <Row className="align-items-center" style={{ marginBottom: '10px' }}>
          {/* User ID */}
          <Col xs={12} md={3} className="mb-2">
            <h5>User ID: YourUserID</h5>
          </Col>

          {/* Building Dropdown */}
          <Col xs={12} md={4} className="mb-2">
            <Form.Select aria-label="Building Select">
              <option>Select a Building</option>
              {buildings.map((building, index) => (
                <option key={index}>{building}</option>
              ))}
            </Form.Select>
          </Col>

          {/* Search Bar */}
          <Col xs={12} md={4} className="mb-2">
            <Form.Control
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>

          {/* Cart Button */}
          <Col xs={12} md={1} className="text-end mb-2">
            <Link to="/cart" className="text-decoration-none">
              <Button variant="outline-primary" size="lg">
                <i className="bi bi-cart3 me-2" style={{ fontSize: '1.5rem' }}></i>
                Cart
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Items Section Container */}
      <Container className="pt-3">
        <Row className="pt-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="text-center border border-dark" onClick={() => handleItemClick(item._id)} style={{ cursor: 'pointer' }}>
                  <Card.Img variant="top" src={"https://www.svgrepo.com/show/508699/landscape-placeholder.svg"} />
                  <Card.Body>
                    <Card.Title>{item.assetType}</Card.Title>
                    <Card.Text>Amount Available: {1}</Card.Text> {/* Placeholder */}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p className="text-center">No items found.</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* Removed Logout button for now */}

    </div>
  );
}

export default EquipmentPage;