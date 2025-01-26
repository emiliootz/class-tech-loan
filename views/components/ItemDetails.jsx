const React = require("react");

function ItemDetails({ item }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemDetails.css" />
      </head>
      <div className="details">
        <h1>{item.model}</h1>
        <p>
          <strong>ID:</strong> {item.assetId}
        </p>
        <p>
          <strong>Type:</strong> {item.assetType}
        </p>
        <p>
          <strong>Make:</strong> {item.make}
        </p>
        <p>
          <strong>Model:</strong> {item.model}
        </p>
        <p>
          <strong>Serial:</strong> {item.serialNumber}
        </p>
        <p>
          <strong>Tag:</strong> {item.umbTagNumber}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Status:</strong> {item.status}
        </p>
        <p>
          <strong>Added:</strong> {new Date(item.dateAdded).toLocaleString()}
        </p>
      </div>
    </>
  );
}

module.exports = ItemDetails;
