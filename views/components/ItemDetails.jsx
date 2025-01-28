/*
 * Purpose:
 * The `ItemDetails` component is designed to display detailed information about a specific item.
 * It dynamically renders fields based on the provided item data and optional field selection.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/itemDetails.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Dynamically displays all item details by default or specific fields based on the `fields` prop.
 * - Provides flexibility for rendering only selected fields if specified in the `fields` prop.
 * - Formats the `dateAdded` field into a readable string using `toLocaleString()`.
 * - Renders fields with a consistent format: `<strong>Field Name:</strong> Field Value`.
 *
 * Props:
 * - `item` (object): An object containing the item's details. The following fields are expected:
 *   - `assetType`, `assetId`, `make`, `model`, `serialNumber`, `umbTagNumber`, `description`, `status`, `dateAdded`.
 * - `fields` (array): An array of strings specifying which fields to display.
 *   If empty, all fields will be displayed.
 *
 * Usage:
 * - To display all item details:
 *   `<ItemDetails item={item} />`
 * - To display specific fields:
 *   `<ItemDetails item={item} fields={["Asset Type", "Asset ID", "Make", "Model"]} />`
 *
 * Notes:
 * - The `fields` prop must match the field names exactly as defined in the `allFields` object.
 * - Ensure the `itemDetails.css` file exists in `/public/css/` and contains the required styles for proper rendering.
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
