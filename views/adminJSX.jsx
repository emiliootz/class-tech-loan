const React = require("react");
const Navbar = require("./components/Navbar");

const AdminPage = ({
  activeTab,
  users,
  items,
  cartCount,
  isLoggedIn,
  isAdmin,
}) => {
  return (
    <html>
      <head>
        <title>Admin Dashboard</title>
        <link rel="stylesheet" href="/css/adminPage.css" />
      </head>
      <body>
        {/* Navbar with isAdmin prop */}
        <Navbar
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />

        {/* Admin Container */}
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>

          {/* Navigation Tabs */}
          <div className="admin-tabs">
            <a
              href="/admin?tab=users"
              className={`tab-button ${activeTab === "users" ? "active" : ""}`}
            >
              Manage Users
            </a>
            <a
              href="/admin?tab=items"
              className={`tab-button ${activeTab === "items" ? "active" : ""}`}
            >
              Manage Items
            </a>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "users" && (
              <div className="tab-pane">
                <h2 className="tab-title">Manage Users</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <div className="action-buttons">
                            <form
                              action={`/admin/users/${user._id}?_method=PUT`}
                              method="POST"
                            >
                              <select name="role">
                                <option
                                  value="user"
                                  selected={user.role === "user"}
                                >
                                  User
                                </option>
                                <option
                                  value="staff"
                                  selected={user.role === "staff"}
                                >
                                  Staff
                                </option>
                                <option
                                  value="admin"
                                  selected={user.role === "admin"}
                                >
                                  Admin
                                </option>
                              </select>
                              <button type="submit" className="btn btn-update">
                                Update
                              </button>
                            </form>

                            <form
                              action={`/admin/users/disable/${user._id}?_method=PUT`}
                              method="POST"
                            >
                              <button type="submit" className="btn btn-disable">
                                {user.disabled ? "Enable" : "Disable"}
                              </button>
                            </form>

                            <form
                              action={`/admin/users/${user._id}?_method=DELETE`}
                              method="POST"
                            >
                              <button type="submit" className="btn btn-delete">
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
};

module.exports = AdminPage;
