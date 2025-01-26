const React = require("react");
const Navbar = require("./components/Navbar");
const AddToCartButton = require("./components/AddToCartButton");
const ProductImage = require("./components/ProductImage");
const ItemDetails = require("./components/ItemDetails");
const ArrivalTime = require("./components/ArrivalTime");
const ReturnTime = require("./components/ReturnTime");

function ItemDetailsPage({ item, isLoggedIn, cartCount = 0 }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemDetailsPage.css" />
      </head>

      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      {/* Main Content */}
      <div className="item-page">
        <div className="row">
          {/* Left Column - Image */}
          <div className="col">
            <ProductImage
              picture={item.imageUrl || "default-image-url.jpg"}
              label={item.model}
            />
          </div>

          {/* Middle Column - Details */}
          <div className="col">
            <ItemDetails item={item} />
          </div>

          {/* Right Column - Time Pickers and Add to Cart */}
          <div className="col">
            <div className="card">
              <ArrivalTime />
              <ReturnTime />
              <AddToCartButton
                itemId={item._id}
                isAvailable={item.status === "Available"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

module.exports = ItemDetailsPage;
