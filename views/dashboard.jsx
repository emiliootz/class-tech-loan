/**
 * @file dashboard.jsx
 * @description Admin dashboard layout using Bootstrap with a fixed Navbar component and custom dashboard content.
 */

const React = require("react");
const Navbar = require("./components/Navbar");

function Dashboard({
  cartCount = 0,
  isLoggedIn = true,
  isAdmin = true,
  isStaff = true,
  activeLoans = 0,
  totalUsers = 0,
  availableItems = 0,
}) {
  return (
    <html>
      <head>
        <title>Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/dashboard.css" />
      </head>

      <body>
        {/* NavBar */}
        <Navbar
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          isStaff={isStaff}
        />

        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Sidebar */}
            <nav className="col-md-3 col-lg-2 bg-light border-end sidebar p-3">
              <h4 className="mb-4 text-primary">Admin</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">Users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/loaned-items">Loans</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin?tab=items">Items</a>
                </li>
              </ul>
            </nav>

            {/* Main Content */}
            <main className="col-md-9 col-lg-10 p-4">
              <h1 className="mb-4">Dashboard</h1>

              <div className="row">
                {/* Summary Cards */}
                <div className="col-12 col-lg-4 mb-4">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Active Loans</h5>
                      <p className="display-6 fw-bold text-primary">{activeLoans}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mb-4">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Total Users</h5>
                      <p className="display-6 fw-bold text-success">{totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mb-4">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Available Items</h5>
                      <p className="display-6 fw-bold text-info">{availableItems}</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = Dashboard;
