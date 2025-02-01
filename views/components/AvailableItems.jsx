/*
 * Purpose:
 * The `AvailableItems` component renders a grid of up to 8 randomly selected items.
 * This component is designed for use on the main pages of
 * the website (e.g., index and protected pages).
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/availableItems.css`,
 *   and the stylesheet is dynamically linked within this component.
 * - AddToCartButton: A child component used to add an item to the cart.
 * - ProductImage: A child component used to display an image of the product.
 *
 * Features:
 * - Randomly shuffles the provided `items` array to ensure a dynamic display.
 * - Displays up to 8 items in a grid layout (2 rows of 4 items each).
 * - Provides an "Add to Cart" button for each item using the `AddToCartButton` component.
 * - Dynamically links each item to its detailed page using its `_id` property.
 * - Displays a placeholder message if no items are available.
 *
 * Props:
 * - `items` (array): An array of item objects, where each object contains:
 *   - `_id`: A unique identifier for the item.
 *   - `picture`: A URL for the item's image.
 *   - `label`: A label or alt text for the item's image.
 *   - `make`: The brand or manufacturer of the item.
 *   - `model`: The model name or number of the item.
 *   Default: An empty array.
 *
 * Usage:
 * - To use this component, include:
 *   `<AvailableItems items={items} />`
 *   Replace `items` with the actual list of item objects.
 *
 * Notes:
 * - The `shuffleArray` function ensures items are displayed in a random order each time the page is rendered.
 * - The component handles cases where the `items` array is empty, displaying a "No items available" message.
 */

const React = require("react");
const { AddToCartButton } = require("./Buttons");
const ProductImage = require("./ProductImage");

/*
 * Function to shuffle an array.
 * This is used to randomize the order of items displayed on the page.
 */

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function AvailableItems({ items = [] }) {
  // Shuffle the array and select the first 8 items
  const displayedItems = shuffleArray(items).slice(0, 8);

  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/availableItems.css" />
      </head>
      <section className="available-items">
        <h2 className="section-title">AVAILABLE ITEMS</h2>
        {displayedItems.length > 0 ? (
          <div className="grid-container">
            {displayedItems.map((item, index) => (
              <div key={index} className="grid-item">
                <div className="product-box">
                  <a href={item._id ? `/item/${item._id}` : "#"}>
                    <ProductImage picture={item.picture} label={item.label} />
                    <div className="product-headline">
                      <div className="name">
                        {item.make} {item.model}
                      </div>
                    </div>
                  </a>
                  <AddToCartButton itemId={item._id} isAvailable={!!item._id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items">No items available at the moment.</p>
        )}
      </section>
    </>
  );
}

module.exports = AvailableItems;
