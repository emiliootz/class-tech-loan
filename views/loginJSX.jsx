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
          `}
        </style>
      </head>
      <body>
        <div className="text-center">
          <h1>Welcome to the Login Page</h1>
          <a href="/auth/google">
            <button className="btn btn-primary mt-3">Login with Google</button>
          </a>
        </div>
      </body>
    </html>
  );
};

module.exports = loginJSX;
