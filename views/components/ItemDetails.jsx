/*

This is rending item details.

The stylesheet for this is under public/css/itemDetails.css

This can be called by using: "<ItemDetails item={item} />"

doing that will call all the item details. 

you can also call with some specific feilds 

example:

<ItemDetails item={item} fields={["Asset Type", "Asset ID", "Make", "Model"]} />

*/

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
