const React = require("react");
const Navbar = require("./components/Navbar"); // adjust path as needed

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
            <img
              src={item.imageUrl || "default-image-url.jpg"} // Ensure you have an image URL for the item
              alt={item.model}
              className="img-fluid shadow-sm rounded"
            />
          </div>

          {/* Middle Column - Item Details */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h1>{item.model}</h1>
              <p><strong>Asset ID:</strong> {item.assetId}</p>
              <p><strong>Asset Type:</strong> {item.assetType}</p>
              <p><strong>Make:</strong> {item.make}</p>
              <p><strong>Model:</strong> {item.model}</p>
              <p><strong>Serial Number:</strong> {item.serialNumber}</p>
              <p><strong>UMB Tag Number:</strong> {item.umbTagNumber}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Date Added:</strong> {new Date(item.dateAdded).toLocaleString()}</p>
            </div>
          </div>

          {/* Right Column - Time pickers and Buttons */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              {/* Arrival Time */}
              <div className="form-group mt-3">
                <label htmlFor="arrivalDate"><strong>Arrival Time    </strong></label>
                <input type="time" id="arrivalDate" className="form-control" />
              </div>

              {/* Return Time */}
              <div className="form-group mt-3">
                <label htmlFor="returnDate"><strong>Return Time    </strong></label>
                <input type="time" id="returnDate" className="form-control" />
              </div>

              {/* Add to Cart Button */}
              <form action={`/add-to-cart/${item._id}`} method="POST">
                <button
                  type="submit"
                  className="btn w-100 mt-3"
                  style={{ backgroundColor: 'green', color: 'white', border: 'none' }}
                >
                  Add to Cart
                </button>
              </form>

              {/* Back to Items Button */}
              <button
                type="button"
                onClick={() => window.location.href = '/protected'}
                className="btn btn-secondary w-100 mt-3"
                style={{ marginTop: '15px' }}  // Additional space between buttons
              >
                Back to Items
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

module.exports = ItemDetailsPage;
