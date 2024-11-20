import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItemDescription = () => {
  const { id } = useParams();

  const itemData = {
    id: 1,
    name: 'Item 1',
    stock: 10,
    borrowTimeIn: '2 weeks',
    timeBorrowedOut: '1 week',
    description: 'This is a detailed description of Item 1.',
    imageUrl: 'https://via.placeholder.com/150',
  };

  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);

  if (id !== String(itemData.id)) {
    return <p>Item not found.</p>;
  }

  return (
    <Container className="mt-4">
      <Card className="border-dark">
        <Card.Body>
          <Row>
            <Col md={6} className="text-center">
              <img src={itemData.imageUrl} alt={itemData.name} className="img-fluid mb-3" />
            </Col>
            <Col md={6}>
              <Card.Title>{itemData.name}</Card.Title>
              <Card.Text>
                <strong>Stock:</strong> {itemData.stock}<br />
                <strong>Borrow Time In:</strong> {itemData.borrowTimeIn}<br />
                <strong>Time Borrowed Out:</strong> {itemData.timeBorrowedOut}<br />
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {itemData.description}
              </Card.Text>

              <div className="mt-3">
                <strong>Time In:</strong>
                <DatePicker
                  selected={timeIn}
                  onChange={(date) => setTimeIn(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control mt-1"
                />
              </div>
              <div className="mt-3">
                <strong>Time Out:</strong>
                <DatePicker
                  selected={timeOut}
                  onChange={(date) => setTimeOut(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control mt-1"
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDescription;
