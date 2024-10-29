import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserPage() {
  // Sample data for items
  const items = [
    { name: 'Item 1', quantity: 2 },
    { name: 'Item 2', quantity: 5 },
    { name: 'Item 3', quantity: 1 },
    { name: 'Item 4', quantity: 3 },
    { name: 'Item 5', quantity: 0 },
  ];

  // Sample data for categories
  const categories = [
    { name: 'Category 1', path: '/category1' },
    { name: 'Category 2', path: '/category2' },
    { name: 'Category 3', path: '/category3' },
    { name: 'Category 4', path: '/category4' },
    { name: 'Category 5', path: '/category5' },
    { name: 'Category 6', path: '/category6' },
  ];

  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs="auto" className="text-end mb-3">
          <Link to="/onclickcart" className="text-decoration-none">
            <Button variant="outline-primary" size="lg" className="d-flex align-items-center">
              <i className="bi bi-cart3 me-2" style={{ fontSize: '1.5rem' }}></i>
              <span style={{ fontSize: '1.25rem' }}>Shopping Cart</span>
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
  <Col>
    <h1 className="text-center">USER ID / Name inserted here from Microsoft etc.</h1>
  </Col>
</Row>


      <Row className="mt-4">
        <Col>
          <Card className="text-center border border-dark">
            <Card.Body>
              <Card.Title>My Items</Card.Title>
              <Row className="mt-3">
                {items.map((item, index) => (
                  <Col key={index} xs={6} md={4} lg={2} className="mb-4">
                    <Card className="text-center border border-dark">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="text-center border border-dark">
            <Card.Body>
              <Card.Title>Categories</Card.Title>
              <Row className="mt-3">
                {categories.map((category, index) => (
                  <Col key={index} xs={6} md={4} className="mb-4">
                    <Link to={category.path} className="text-decoration-none">
                      <Card className="text-center border border-dark">
                        <Card.Body>
                          <Card.Title>{category.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
