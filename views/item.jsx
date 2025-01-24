// views/ItemDetailsPage.jsx
const React = require("react");
const Navbar = require("./components/Navbar"); // adjust path as needed

function ItemDetailsPage({ item, isLoggedIn, cartCount = 0 }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
        {/*
          If you want Bootstrap or other CSS,
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" />
        */}
      </head>

      {/* Navbar at the top, just like ProtectedPage */}
      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      {/* Main content */}
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h1>Item Details</h1>
          <p>
            <strong>Asset ID:</strong> {item.assetId}
          </p>
          <p>
            <strong>Asset Type:</strong> {item.assetType}
          </p>
          <p>
            <strong>Make:</strong> {item.make}
          </p>
          <p>
            <strong>Model:</strong> {item.model}
          </p>
          <p>
            <strong>Serial Number:</strong> {item.serialNumber}
          </p>
          <p>
            <strong>UMB Tag Number:</strong> {item.umbTagNumber}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
          <p>
            <strong>Date Added:</strong>{" "}
            {new Date(item.dateAdded).toLocaleString()}
          </p>

          <a href="/protected" className="btn btn-secondary mt-3">
            Back to Items
          </a>
        </div>
      </div>
    </>
  );
}

module.exports = ItemDetailsPage;
