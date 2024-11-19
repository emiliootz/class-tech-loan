import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserPage from './UserPage';
import OnClickCart from './OnClickCart';
import OnClickCategories from './OnClickCategories';
import ItemDescription from './ItemDescription';
import i18n from './i18n';
import {useTranslation} from 'react-i18next';

const LoginPage = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: `${username}@umb.edu`,
        password,
      });
      const { user, token } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      navigate('/new'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="login-card shadow">
        <Card.Body>
          <h1 className="text-center mb-4">{t('login')}</h1>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
              />
              <Form.Text className="text-muted">
                (e.g. yourname@umb.edu)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>
            <Button variant="primary" size="lg" className="mt-4 w-100" onClick={handleLogin}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route path="/new" element={<UserPage />} />
        <Route path="/onclickcart" element={<OnClickCart />} />
        <Route path="/category1" element={<OnClickCategories />} />
        <Route path="/category2" element={<OnClickCategories />} />
        <Route path="/category3" element={<OnClickCategories />} />
        <Route path="/category4" element={<OnClickCategories />} />
        <Route path="/category5" element={<OnClickCategories />} />
        <Route path="/category6" element={<OnClickCategories />} />
        <Route path="/item/:id" element={<ItemDescription />} />
        
      </Routes>
    </Router>
  );
};

export default App;
