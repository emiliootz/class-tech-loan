const React = require("react");
const Navbar = require("./components/Navbar");

function EditUser({ user, isLoggedIn, isAdmin, cartCount }) {
  return (
    <html>
      <head>
        <title>Edit User</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/users.css" />
      </head>

      <body>
        <Navbar
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />

        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Sidebar */}
            <nav className="col-md-3 col-lg-2 bg-light border-end sidebar p-3">
              <h4 className="mb-4 text-primary">Admin</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/users">Users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/loaned-items">Loans</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin?tab=items">Items</a>
                </li>
              </ul>
            </nav>

            {/* Main content */}
            <main className="col-md-9 col-lg-10 p-4">
              <div className="d-flex align-items-center mb-4 gap-3">
                <a href="/users" className="btn btn-outline-secondary btn-sm">
                  &larr; Back
                </a>
                <h1 className="mb-0">Edit User</h1>
              </div>

              <div className="card" style={{ maxWidth: "500px" }}>
                <div className="card-body">
                  <form
                    action={`/users/${user._id}?_method=PUT`}
                    method="POST"
                  >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={user.name || ""}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={user.email || ""}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        defaultValue={user.phone || ""}
                        placeholder="999-999-9999"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="role" className="form-label fw-semibold">Role</label>
                      <select
                        id="role"
                        name="role"
                        className="form-select"
                        defaultValue={user.role}
                      >
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <a href="/users" className="btn btn-outline-secondary">
                        Cancel
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}

module.exports = EditUser;
