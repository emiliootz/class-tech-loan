const React = require('react');

const loginJSX = () => {
  return (
    <html>
      <head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <style>
          {`
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
            }
              .logo {
              max-width: 500px;
              margin-bottom: 10px;
              }
              h1 {
              font-weight: bold;
              color: #005A8B; /* umass logo color */
            }
              .btn-primary {
              background-color: #005A8B;
              border-color: #005A8B;
              }
              .btn-primary:hover {
              background-color: #00436a;
              border-color: #00436a;
              }

          `}
        </style>
      </head>
      <body>
        <div className="text-center">
        <img src="/images/Blue-UMB-logo-lockup.png" alt="UMass Logo" className="logo" />
          <h1>Technology Loan System</h1>
          <a href="/auth/google">
            <button className="btn btn-primary mt-3">Login with Google</button>
          </a>
        </div>
      </body>
    </html>
  );
};

module.exports = loginJSX;
