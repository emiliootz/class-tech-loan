const React = require("react");

function AuthButton({ isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/authButton.css" />
      </head>
      {isLoggedIn ? (
        <a className="signout" href="/logout">
          <button>Log Out</button>
        </a>
      ) : (
        <a className="signin" href="/auth/google">
          <button>Sign In</button>
        </a>
      )}
    </>
  );
}

module.exports = AuthButton;
