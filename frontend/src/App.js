import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EquipmentList from './pages/EquipmentList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/equipment" component={EquipmentList} />
      </Switch>
    </Router>
  );
}

export default App;
