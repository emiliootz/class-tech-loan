import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignonPage = () =>  {
    const clientID = "692964394601-nt6oc3esoam2julek3sm1kehqf1i0vhe.apps.googleusercontent.com";
      // Success handler
  const onSuccess = async (res) => {
    console.log("Login success! Current user:", res);
    handleLoginSuccess(res.credential);
  };

  // Failure handler
  const onFailure = (res) => {
    console.log("Login failed res:", res);
  };

  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Login Success:', credentialResponse);

    // Send the credential to the backend
    const response = await axios.get('http://localhost:8080' + '/protected', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log('Backend response:', data))
      .catch((error) => console.error('Error sending token:', error));

      console.log(response);
  };

    return (
    <div className="container">
      <div className="card shadow-lg p-4">
        <h3>Class Tech Loan</h3>
        <div id="signinButton">
        <GoogleOAuthProvider clientId={clientID}>
          <GoogleLogin
            clientId={clientID}
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
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default SignonPage;
