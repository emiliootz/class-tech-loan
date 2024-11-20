import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'

import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {mock_items} from './mock_data/data.js'
import UserPageOptions from './components/UserPage/UserPageOptions.js';

function UserPage() {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mock_items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate(); 

  const handleItemClick = (id) => {
    navigate(`/item/${id}`); 
  };

  return (
    <Container className="mainContainer">
      <UserPageOptions searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />

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
      <Container>
        <Col xs={6}>
            <p>User name: [User Name]</p>
            <p>User Email: [User Email]</p>
          </Col>
      </Container>
    </Container>
  );
}

export default UserPage;
