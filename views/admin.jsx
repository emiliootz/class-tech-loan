const React = require("react");
const Navbar = require("./components/Navbar");

const AdminPage = ({
  activeTab,
  users,
  items,
  cartCount,
  isLoggedIn,
  isAdmin,
  flash = {},
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

          {flash.success && flash.success.length > 0 && (
            <div className="alert alert-success" role="alert">
              {flash.success[0]}
            </div>
          )}
          {flash.error && flash.error.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {flash.error[0]}
            </div>
          )}

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

          {/* Items Management */}
          {activeTab === "items" && (
            <div className="tab-pane">
              <h2 className="tab-title">Manage Items</h2>

              {/* Add New Item Form */}
              <form
                action="/add-item"
                method="POST"
                encType="multipart/form-data"
                className="add-user-form"
              >
                <input type="text" name="assetId" placeholder="Asset ID" required />
                <input type="text" name="assetType" placeholder="Type (e.g. Video, Audio)" required />
                <input type="text" name="make" placeholder="Make" required />
                <input type="text" name="model" placeholder="Model" required />
                <select name="status" required>
                  <option value="Available">Available</option>
                  <option value="Loaned">Loaned</option>
                  <option value="Assigned To Location">Assigned To Location</option>
                </select>
                <label style={{ fontSize: "13px", color: "#555" }}>
                  Item Image (optional)
                  <input type="file" name="picture" accept="image/jpeg,image/png,image/webp" style={{ display: "block", marginTop: "4px" }} />
                </label>
                <button type="submit" className="btn btn-add">Add Item</button>
              </form>

              {/* Existing Items Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Type</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.assetId}</td>
                      <td>{item.assetType}</td>
                      <td>{item.make}</td>
                      <td>{item.model}</td>
                      <td>{item.status}</td>
                      <td>
                        <form
                          action={`/delete-item/${item._id}?_method=DELETE`}
                          method="POST"
                          style={{ display: "inline" }}
                        >
                          <button type="submit" className="btn btn-delete">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
