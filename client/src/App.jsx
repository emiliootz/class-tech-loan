import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import { RouterProvider } from 'react-router-dom';  // Import necessary Router components
import router from '../public/router';
import { Navbar } from 'react-bootstrap';
import HomePage from './HomePage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  }

  const fetchAuth = async () => {
    const response = await axios.post("http://localhost:8080/api/auth/google")
    console.log(response);
  }

  useEffect(() => {
    fetchAPI()
    fetchAuth()
  }, [])
 
  return (
    <RouterProvider router={router} />
  )
}

export default App;


/**
 * 
 *   const [count, setCount] = useState(0)
 * 
 * import reactLogo from './assets/react.svg'
 * import viteLogo from '/vite.svg'
 * 
 *       <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 */