import React from "react";

const ItemDetails = ({ item }) => {
  return (
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
  );
};

export default ItemDetails;
