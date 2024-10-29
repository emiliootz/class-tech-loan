import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Button, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './UserPage';
import OnClickCart from './OnClickCart';
import OnClickCategories from './OnClickCategories';
import ItemDescription from './ItemDescription';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Container className="App">
              <Row className="justify-content-center text-center">
                <Col>
                  <header>UMB IT Department Loans</header>
                  <Link to="/new">
                    <Button variant="primary" size="lg" className="mt-3">
                      Log in
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          } 
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
}

export default App;
