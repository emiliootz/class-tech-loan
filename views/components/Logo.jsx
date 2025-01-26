const React = require("react");

function Logo({ isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/logo.css" />
      </head>
      <a href={isLoggedIn ? "/protected" : "/"}>
        <img
          className="logo"
          src="/images/UMassBoston-Logo/Blue-logo-lockup/Blue-UMB-logo-lockup.png"
          alt="UMass Boston Logo"
        />
      </a>
    </>
  );
}

module.exports = Logo;
