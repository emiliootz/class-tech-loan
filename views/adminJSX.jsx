import React, { useState } from "react";

const AdminPage = ({ users, items }) => {
    const [newItem, setNewItem] = useState({
        assetId: "",
        assetType: "",
        make: "",
        model: "",
        status: "Available",
    });

    const [activeSection, setActiveSection] = useState("users");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/add-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                alert("Item added successfully");
                window.location.reload();
            } else {
                alert("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleDeleteItem = async (assetId) => {
        try {
            const response = await fetch(`/delete-item/${assetId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Item deleted successfully");
                window.location.reload();
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <html>
            <head>
                <title>Admin Dashboard</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div className="container-fluid">
                    <div className="row">
                        {/* Sidebar */}
                        <nav
                            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar"
                            style={{ height: "100vh", position: "fixed", color: "#fff" }}
                        >
                            <div className="position-sticky">
                                <div className="text-center py-4">
                                    <img
                                        src="/images/UMassBoston-Logo/white-logo-lockup/White-UMB-logo-lockup.png"
                                        alt="UMass Boston Logo"
                                        style={{ maxWidth: "150px" }}
                                    />
                                </div>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link w-100 text-start text-white ${activeSection === "users" ? "active bg-primary" : ""}`}
                                            style={{
                                                backgroundColor: activeSection === "users" ? "#005A8B" : "transparent",
                                                border: "none",
                                                padding: "10px 20px",
                                            }}
                                            onClick={() => setActiveSection("users")}
                                        >
                                            Manage Users
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link w-100 text-start text-white ${activeSection === "items" ? "active bg-primary" : ""}`}
                                            style={{
                                                backgroundColor: activeSection === "items" ? "#005A8B" : "transparent",
                                                border: "none",
                                                padding: "10px 20px",
                                            }}
                                            onClick={() => setActiveSection("items")}
                                        >
                                            Manage Items
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginLeft: "250px" }}>
                            <header className="d-flex justify-content-between align-items-center py-3">
                                <h1 className="h3" style={{ color: "#005A8B" }}>
                                    Admin Dashboard
                                </h1>
                                <a href="/logout" className="btn btn-outline-primary">
                                    Logout
                                </a>
                            </header>

                            {/* Manage Users Section */}
                            {activeSection === "users" && (
                                <section>
                                    <h2 style={{ color: "#005A8B" }}>Manage Users</h2>
                                    <div className="card p-3 mt-3 shadow-sm">
                                        <ul className="list-group">
                                            {users.map((user) => (
                                                <li
                                                    key={user._id}
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-3"
                                                >
                                                    <div>
                                                        <p className="mb-1">
                                                            <strong>Name:</strong> {user.name}
                                                        </p>
                                                        <p className="mb-0">
                                                            <strong>Role:</strong> {user.role}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            )}

                            {/* Manage Items Section */}
                            {activeSection === "items" && (
                                <section>
                                    <h2 style={{ color: "#005A8B" }}>Manage Items</h2>
                                    <div className="card p-3 mt-3 shadow-sm">
                                        <ul className="list-group">
                                            {items.map((item) => (
                                                <li
                                                    key={item._id}
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-3"
                                                >
                                                    <div>
                                                        <p className="mb-1">
                                                            <strong>Asset ID:</strong> {item.assetId}
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Type:</strong> {item.assetType}
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Make:</strong> {item.make}
                                                        </p>
                                                        <p className="mb-0">
                                                            <strong>Model:</strong> {item.model}
                                                        </p>
                                                    </div>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteItem(item.assetId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Add Item Form */}
                                    <div className="mt-5">
                                        <h3 style={{ color: "#005A8B" }}>Add New Item</h3>
                                        <form
                                            onSubmit={handleAddItem}
                                            className="border p-4 shadow-sm rounded bg-light"
                                        >
                                            <div className="mb-3">
                                                <label htmlFor="assetId" className="form-label">
                                                    Asset ID:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="assetId"
                                                    name="assetId"
                                                    value={newItem.assetId}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="assetType" className="form-label">
                                                    Asset Type:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="assetType"
                                                    name="assetType"
                                                    value={newItem.assetType}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="make" className="form-label">
                                                    Make:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="make"
                                                    name="make"
                                                    value={newItem.make}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="model" className="form-label">
                                                    Model:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="model"
                                                    name="model"
                                                    value={newItem.model}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100"
                                                style={{ backgroundColor: "#005A8B" }}
                                            >
                                                Add Item
                                            </button>
                                        </form>
                                    </div>
                                </section>
                            )}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default AdminPage;
