const React = require("react");

function ItemDetails({ item, fields = [] }) {
  const allFields = {
    "Asset Type": item.assetType,
    "Asset ID": item.assetId,
    Make: item.make,
    Model: item.model,
    Serial: item.serialNumber,
    Tag: item.umbTagNumber,
    Description: item.description,
    Status: item.status,
    Added: new Date(item.dateAdded).toLocaleString(),
  };

  const fieldsToShow =
    fields.length > 0
      ? Object.keys(allFields).filter((key) => fields.includes(key))
      : Object.keys(allFields);

  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemDetails.css" />
      </head>
      <div className="details">
        {fieldsToShow.map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {allFields[key]}
          </p>
        ))}
      </div>
    </>
  );
}

module.exports = ItemDetails;
