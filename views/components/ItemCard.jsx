const React = require("react");
const { AddToCartButton } = require("./Buttons");
const ProductImage = require("./ProductImage");

function ItemCard({ item }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemCard.css" />
      </head>
      <section className="card">
        <ProductImage
          className="image"
          picture={item.picture}
          label={item.label}
        />

        <div className="text">
          {item.make} {item.model}
        </div>
        <div className="button">
          <AddToCartButton itemId={item._id} isAvailable={!!item._id} />
        </div>
      </section>
    </>
  );
}
module.exports = ItemCard;
