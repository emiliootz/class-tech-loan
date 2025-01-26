const React = require("react");
const Navbar = require("./components/Navbar"); // Adjust path as needed
const AddToCartButton = require("./components/AddToCartButton"); // Adjust path as needed
const ProductImage = require("./components/ProductImage"); // Adjust path as needed
const ItemDetails = require("./components/ItemDetails"); // Adjust path as needed
const ArrivalTime = require("./components/ArrivalTime"); // Adjust path as needed
const ReturnTime = require("./components/ReturnTime"); // Adjust path as needed

function ItemDetailsPage({ item, isLoggedIn, cartCount = 0 }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>

      {/* Navbar at the top */}
      <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />

      {/* Main content */}
      <div className="container-fluid item-details-page d-flex justify-content-center align-items-start min-vh-100">
        <div className="row w-100">
          {/* Left Column - Image */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <ProductImage
              picture={item.imageUrl || "default-image-url.jpg"}
              label={item.model}
            />
          </div>

          {/* Middle Column - Item Details */}
          <div className="col-md-4">
            <ItemDetails item={item} />
          </div>

          {/* Right Column - Time pickers and Add to Cart Button */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <ArrivalTime />
              <ReturnTime />
              <div className="add-to-cart-button-container mt-3">
                <AddToCartButton
                  itemId={item._id}
                  isAvailable={item.status === "Available"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

module.exports = ItemDetailsPage;
