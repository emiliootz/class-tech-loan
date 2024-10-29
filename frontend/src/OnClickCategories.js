import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function OnClickCategories() {
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const buildings = [
    'McCormack',
    'University Hall',
    'Wheatley',
  ];

  const handleSelect = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Building: ${selectedBuilding}`);
  };

  return (
    <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="border-dark p-5" style={{ width: '500px' }}>
        <Card.Body className="text-center">
          <h2>Select a Building</h2>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="buildingSelect">
              <Form.Label>Select from the options below:</Form.Label>
              <InputGroup>
                <Form.Control 
                  as="select" 
                  value={selectedBuilding} 
                  onChange={handleSelect}
                  style={{ height: '60px' }} // Increased height
                >
                  <option value="">Choose a building...</option>
                  {buildings.map((building, index) => (
                    <option key={index} value={building}>{building}</option>
                  ))}
                </Form.Control>
                <InputGroup.Text 
                  as={Button} 
                  variant="primary" 
                  onClick={handleSubmit} 
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default OnClickCategories;
