import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
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

  const filteredItems = cartItems.filter(item => item.quantity > 0);

  const handleRemove = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`); // Navigate to ItemDescription
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Shopping Cart</h1>

      {filteredItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        filteredItems.map((item) => (
          <Card className="mb-4 border border-dark" key={item.id}>
            <Card.Body className="d-flex justify-content-between align-items-center" onClick={() => handleItemClick(item.id)} style={{ cursor: 'pointer' }}>
              <div>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
              </div>
              <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}>
                X
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default OnClickCart;
