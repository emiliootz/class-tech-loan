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
        {/* Navbar */}
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

          {/* Users Management */}
          {activeTab === "users" && (
            <div className="tab-pane">
              <h2 className="tab-title">Manage Users</h2>

              {/* Add New User Form */}
              <form action="/users/add" method="POST" className="add-user-form">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                />
                <select name="role" required>
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn btn-add">
                  Add User
                </button>
              </form>

              {/* Existing Users Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>

                      {/* Phone & Role Inputs in the same form */}
                      <form
                        action={`/admin/users/update/${user._id}?_method=PUT`}
                        method="POST"
                      >
                        <td>
                          <input
                            type="text"
                            name="phone"
                            defaultValue={user.phone}
                            required
                          />
                        </td>

                        <td>
                          <select name="role" defaultValue={user.role}>
                            <option value="user">User</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        {/* Actions Column */}
                        <td>
                          <div className="action-buttons">
                            <button type="submit" className="btn btn-update">
                              Update
                            </button>

                            {/* Disable/Enable User */}
                            <form
                              action={`/admin/users/disable/${user._id}?_method=PUT`}
                              method="POST"
                            >
                              <button type="submit" className="btn btn-disable">
                                {user.disabled ? "Enable" : "Disable"}
                              </button>
                            </form>

                            {/* Delete User */}
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
                      </form>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

module.exports = AdminPage;
