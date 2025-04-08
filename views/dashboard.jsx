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
                  <a className="nav-link active" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Loans
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Items
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Reports
                  </a>
                </li>
              </ul>
            </nav>

            {/* Main Content */}
            <main className="col-md-9 col-lg-10 p-4">
              <h1 className="mb-4">Dashboard</h1>

              <div className="row">
                {/* Chart Section */}
                <div className="col-12 col-lg-8 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">Usage Overview</h5>
                      <div className="chart-placeholder mt-3 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="col-12 col-lg-4 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">Quick Stats</h5>
                      <ul className="list-unstyled mt-3">
                        <li>
                          <strong>Active Loans:</strong> 24
                        </li>
                        <li>
                          <strong>Total Users:</strong> 85
                        </li>
                        <li>
                          <strong>Available Items:</strong> 130
                        </li>
                      </ul>
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
