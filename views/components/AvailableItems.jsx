const React = require("react");
const ItemGrid = require("./itemGrid");

function AvailableItems({ items = [] }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/availableItems.css" />
      </head>
      <div className="available-items">
        <section>
          <div className="title">Available Items</div>
          <ItemGrid items={items} />
        </section>
      </div>
    </>
  );
}

module.exports = AvailableItems;
