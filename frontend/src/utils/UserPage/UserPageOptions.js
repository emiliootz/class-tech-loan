import React from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { mock_categories, mock_buildings } from '../../mock_data/data';

export default function userpage_Options(searchQuery, setSearchQuery) {
    return (
        <Container className="userOptions">
        <Row className="mt-3 align-items-center">
          <Col xs={6} className="text-center">
            <Form.Select className="d-inline w-auto">
              <option>Choose a Category</option>
              {mock_categories.map((category, index) => (
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
            {mock_buildings.map((building, index) => (
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
      </Container>
    )
}