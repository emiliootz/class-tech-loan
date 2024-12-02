import { GoogleLogin } from 'react-google-login';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/Login.css';  
import getClientID from './getClientID';

function Login() {
  // Success handler
  const onSuccess = (res) => {
    console.log("Login success! Current user:", res.profileObj);
  };

  // Failure handler
  const onFailure = (res) => {
    console.log("Login failed res:", res);
  };

  return (
    <div className="container">
      <div className="card shadow-lg p-4">
        <h3>Class Tech Loan</h3>
        <div id="signinButton">
          <GoogleLogin
            clientId={getClientID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google-login-button w-100 d-flex align-items-center justify-content-center"
              >
                <i className="fab fa-google"></i>
                Login with Google
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;