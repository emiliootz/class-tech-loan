/**
 * @file ItemCard.jsx
 * @description Displays an equipment item as a Bootstrap card with an image,
 *              name, and Add to Cart button. Used in ItemGrid on the Home page.
 */

const React = require("react");
const ProductImage = require("./ProductImage");

/**
 * ItemCard Component
 *
 * @param {Object} props
 * @param {Object} props.item - Equipment item object
 * @param {string} props.item._id - Item ID (used for links/actions)
 * @param {string} props.item.make - Manufacturer name
 * @param {string} props.item.model - Model name
 * @param {string} props.item.picture - Image path for the item
 * @param {string} props.item.label - Alt label for image
 * @returns {JSX.Element} A single item rendered in a Bootstrap card
 */
function ItemCard({ item }) {
  return (
    <>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/itemCard.css" />
      </head>

      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <a
          href={`/item/${item._id}`}
          className="text-decoration-none text-dark"
        >
          <div className="card h-100 shadow-sm">
            {/* Image */}
            <ProductImage
              picture={item.picture}
              label={item.label}
              className="card-img-top"
            />

            {/* Content */}
            <div className="card-body text-center">
              <h5 className="card-title">
                {item.make} {item.model}
              </h5>
              {item.status === "Available" ? (
                <form action={`/add-to-cart/${item._id}`} method="POST">
                  <button type="submit" className="btn btn-umb w-100">
                    Add to Cart
                  </button>
                </form>
              ) : (
                <button className="btn btn-secondary w-100" disabled>
                  Unavailable
                </button>
              )}
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

module.exports = ItemCard;
