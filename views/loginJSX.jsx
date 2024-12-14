const React = require("react");

const loginJSX = () => {
  return (
    <html>
      <head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <div className="text-center">
          <img
            src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
            alt="University of Massachusetts Boston Logo"
            className="logo"
          />
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
