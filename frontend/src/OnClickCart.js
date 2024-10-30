import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialCartItems = [
  { id: 1, name: 'Item 1', quantity: 3, owner: 'User A' },
  { id: 2, name: 'Item 2', quantity: 0, owner: 'User A' },
  { id: 3, name: 'Item 3', quantity: 2, owner: 'User A' },
  { id: 4, name: 'Item 4', quantity: 3, owner: 'User A' },
];

function OnClickCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`); 
  };

  const handleTimeChange = (id, field, value) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cartItems.map((item) => (
          item.quantity > 0 && (
            <Card className="mb-4 border border-dark" key={item.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={4} onClick={() => handleItemClick(item.id)} style={{ cursor: 'pointer' }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                  </Col>
                  
                  <Col xs={3}>
                    <Form.Group controlId={`timeIn-${item.id}`}>
                      <Form.Label>Time In</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={item.timeIn || ''}
                        onChange={(e) => handleTimeChange(item.id, 'timeIn', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col xs={3}>
                    <Form.Group controlId={`timeOut-${item.id}`}>
                      <Form.Label>Time Out</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={item.timeOut || ''}
                        onChange={(e) => handleTimeChange(item.id, 'timeOut', e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs="auto" className="ms-auto">
                    <Button variant="danger" onClick={() => handleRemove(item.id)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        ))
      )}
    </Container>
  );
}

export default OnClickCart;
