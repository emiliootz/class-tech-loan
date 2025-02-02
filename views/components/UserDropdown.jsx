const React = require("react");
const { AuthButton } = require("./Buttons");

function UserDropdown({ isAdmin, isLoggedIn }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/dropdown.css" />
      </head>
      <div className="dropdown">
        <button className="dropdown-toggle">Account</button>
        <div className="dropdown-menu">
          {isAdmin && (
            <a href="/admin" className="admin">
              Admin
            </a>
          )}
          <div className="logout">
            <AuthButton isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </>
  );
}

module.exports = UserDropdown;
