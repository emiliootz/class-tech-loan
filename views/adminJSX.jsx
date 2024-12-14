import React from "react";

const AdminPage = ({ users, items }) => {
  return (
    <html>
      <head>
        <title>Admin Dashboard</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
      </head>
      <body className="container mt-4">
        <h1>Admin Dashboard</h1>

        <h2>Manage Users</h2>
        <table className="table table-striped">
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

        <h2>Manage Items</h2>
        <table className="table table-striped">
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
      </body>
    </html>
  );
};

export default AdminPage;
