/**
 * @file users.jsx
 * @description Admin/Staff-only user management page with table of users and admin-only edit/delete actions.
 */

const React = require("react");
const Navbar = require("./components/Navbar");

function Users({
  users = [],
  isLoggedIn = false,
  isAdmin = false,
  isStaff = false,
  cartCount = 0,
}) {
  if (!isLoggedIn || (!isAdmin && !isStaff)) {
    return (
      <html>
        <head>
          <title>Access Denied</title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <Navbar
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            isStaff={isStaff}
            cartCount={cartCount}
          />
          <div className="container py-5 text-center">
            <h1 className="text-danger">Access Denied</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <title>User Management</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/users.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
      </head>

      <body>
        <Navbar
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          isStaff={isStaff}
        />

        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Sidebar (same as dashboard) */}
            <nav className="col-md-3 col-lg-2 bg-light border-end sidebar p-3">
              <h4 className="mb-4 text-primary">Admin</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/users">
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

            {/* Main content */}
            <main className="col-md-9 col-lg-10 p-4">
              <h1 className="mb-4">User Management</h1>

              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="custom-thead">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      {isAdmin && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        {isAdmin && (
                          <td>
                            <a
                              href={`/users/${user._id}/edit`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              Edit
                            </a>
                            <form
                              method="POST"
                              action={`/admin/users/${user._id}?_method=DELETE`}
                              style={{ display: "inline" }}
                            >
                              <button
                                type="submit"
                                className="btn btn-sm btn-outline-danger"
                              >
                                Delete
                              </button>
                            </form>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = Users;
