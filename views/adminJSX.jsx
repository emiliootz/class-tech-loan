const React = require("react");
const Navbar = require("./components/Navbar");

const AdminPage = ({ activeTab, users, items, cartCount, isLoggedIn }) => {
  return (
    <html>
      <head>
        <title>Admin Dashboard</title>
        <link rel="stylesheet" href="/css/adminPage.css" />
      </head>
      <body>
        {/* Navbar */}
        <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} />

        {/* Main Admin Content */}
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
            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="tab-pane">
                <h2 className="tab-title">Manage Users</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Items Tab */}
            {activeTab === "items" && (
              <div className="tab-pane">
                <h2 className="tab-title">Manage Items</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset ID</th>
                      <th>Asset Type</th>
                      <th>Make</th>
                      <th>Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.assetId}</td>
                        <td>{item.assetType}</td>
                        <td>{item.make}</td>
                        <td>{item.model}</td>
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
