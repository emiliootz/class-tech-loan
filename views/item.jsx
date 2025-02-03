const React = require("react");
const Navbar = require("./components/Navbar");
const { AddToCartButton } = require("./components/Buttons");
const ProductImage = require("./components/ProductImage");
const ItemDetails = require("./components/ItemDetails");
const TimePicker = require("./components/TimePicker");

function ItemDetailsPage({
  item,
  isLoggedIn,
  cartCount = 0,
  isAdmin = false,
  isStaff = false,
}) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/itemDetailsPage.css" />
      </head>

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        isStaff={isStaff}
      />

      {/* Main Content */}
      <div className="item-page">
        <div className="row">
          {/* Left Column - Image */}
          <div className="col">
            <ProductImage picture={item.picture} label={item.label} />
          </div>

          {/* Middle Column - Details */}
          <div className="col">
            <ItemDetails item={item} />
          </div>

          {/* Right Column - Time Pickers and Add to Cart */}
          <div className="col">
            <div className="card">
              <TimePicker label="Arrival Time" id="arrivalDate" />
              <TimePicker label="Return Time" id="returnDate" />
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
