import React from "react";

const jsxProtected = ({ name, items }) => {
  return (
    <div className="container mt-4">
      {/* Navigation Bar */}
      <nav className="navbar navbar-light bg-light mb-3">
        <span className="navbar-brand">Welcome, {name}</span>
        <a href="/cart" className="btn btn-primary">
          View Cart
        </a>
      </nav>

      {/* Items List */}
      <h1 className="text-center">Available Items</h1>
      <ul className="list-unstyled">
        {items.map((item) => (
          <li key={item._id} className="card my-3 p-3 shadow-sm">
            <h3>
              {item.assetType} - {item.make} {item.model}
            </h3>
            <p>
              <strong>Asset ID:</strong> {item.assetId}
            </p>
            <a href={`/item/${item._id}`} className="btn btn-info">
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default jsxProtected;
