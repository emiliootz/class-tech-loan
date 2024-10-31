import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function UserPage() {
  const items = [
    { id: 1, name: 'Item 1', quantity: 2, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item 2', quantity: 5, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item 3', quantity: 1, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Item 4', quantity: 3, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Item 5', quantity: 0, image: 'https://via.placeholder.com/150' },
  ];

  const categories = [
    { name: 'Category 1', path: '/category1' },
    { name: 'Category 2', path: '/category2' },
    { name: 'Category 3', path: '/category3' },
    { name: 'Category 4', path: '/category4' },
    { name: 'Category 5', path: '/category5' },
    { name: 'Category 6', path: '/category6' },
  ];

  const buildings = [
    'McCormack',
    'University Hall',
    'Wheatley'
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate(); 

  const handleItemClick = (id) => {
    navigate(`/item/${id}`); 
  };

  return (
    <Container>
      <Row className="mt-3 align-items-center">
        <Col xs={3}>
          <h5>User ID: YourUserID</h5>
        </Col>
        <Col xs={6} className="text-center">
          <Form.Select className="d-inline w-auto">
            <option>Choose a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.path}>{category.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={3} className="text-end">
          <Link to="/onclickcart" className="text-decoration-none">
            <Button variant="outline-primary" size="lg" className="d-flex align-items-center">
              <i className="bi bi-cart3 me-2" style={{ fontSize: '1.5rem' }}></i>
              Cart
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={3}>
          <Form.Select className="w-100">
            <option>Select a Building</option>
            {buildings.map((building, index) => (
              <option key={index}>{building}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={9}>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="text-center border border-dark">
            <Card.Body>
              <Card.Title>My Items</Card.Title>
              <Row className="mt-3">
                {filteredItems.map((item, index) => (
                  <Col key={index} xs={6} md={4} lg={3} className="mb-4">
                    <Card className="text-center border border-dark" onClick={() => handleItemClick(item.id)} style={{ cursor: 'pointer' }}>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Amount Available: {item.quantity}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {filteredItems.length === 0 && (
                <p className="text-center">No items found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
