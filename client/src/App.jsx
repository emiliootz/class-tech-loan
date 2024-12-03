import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import { RouterProvider } from 'react-router-dom';  // Import necessary Router components
import router from '../public/router';

function App() {

  /**
   * Determines which URL should be used for the Back-End based on the domain (url) of the Front-End
   * @returns String
   */
  const FindBackendURL = () => {
    switch (window.location.hostname) {
      case "localhost": // Local environment
      case "127.0.0.1":
        return "http://localhost:8080";
      default:
        return "http://localhost:8080";
    }
  };

  const [backendURL, setBackendURL] = useState(FindBackendURL());

  const fetchAPI = async () => {
    const response = await axios.get(backendURL + "/api");
    console.log(response.data.fruits);
  }

  const fetchAuth = async () => {
    const response = await axios.post(backendURL + "/auth/google")
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