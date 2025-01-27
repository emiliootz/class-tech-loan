/*
  
  This function is rendering the button for signing in and signing out 
  the stylesheet for this is under public/css/authButton.css

  to call this within a page you will use: "<AuthButton />"
  
  */

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
