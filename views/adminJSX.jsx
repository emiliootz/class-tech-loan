import React from "react";

const AdminPage = ({ users, items }) => {
    return (
        <html>
            <head>
                <title>Admin Dashboard</title>
            </head>
            <body>
                <h1>Admin Dashboard</h1>

                <h2>Manage Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.name} ({user.role})
                        </li>
                    ))}
                </ul>
                <form action="/add-user" method="POST">
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <select name="role" required>
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Add User</button>
                </form>

                <h2>Manage Items</h2>
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            {item.assetId} - {item.assetType} - {item.make} - {item.model}
                            <form action={`/delete-item/${item._id}?_method=DELETE`} method="POST">
                                <button type="submit">Delete</button>
                            </form>
                        </li>
                    ))}
                </ul>
                <form action="/add-item" method="POST">
                    <input type="text" name="assetId" placeholder="Asset ID" required />
                    <input type="text" name="assetType" placeholder="Asset Type" required />
                    <input type="text" name="make" placeholder="Make" required />
                    <input type="text" name="model" placeholder="Model" required />
                    <input type="hidden" name="status" value="Available" />
                    <button type="submit">Add Item</button>
                </form>
            </body>
        </html>
    );
};

export default AdminPage;
