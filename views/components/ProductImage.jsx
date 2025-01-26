const React = require("react");

function ProductImage({ picture, label }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/productImage.css" />
      </head>
      <div className="image">
        <img src={picture} alt={label} />
      </div>
    </>
  );
}

module.exports = ProductImage;
