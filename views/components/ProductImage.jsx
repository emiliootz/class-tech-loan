/*
 * Purpose:
 * The `ProductImage` component renders an image for a product, along with an
 * accessible label for the image. It provides a consistent way to display product
 * images across the website.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/productImage.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Displays an image for a product using the `picture` prop as the source (`src`).
 * - Provides an alternative text (`alt`) using the `label` prop for accessibility.
 * - Applies the `image` class to the containing `<div>` for consistent styling.
 *
 * Props:
 * - `picture` (string): A URL or file path to the product's image. This is used as the value for the `src` attribute.
 * - `label` (string): A descriptive label for the image, used as the `alt` attribute for accessibility.
 *
 * Usage:
 * - To use this component, include:
 *   `<ProductImage picture={picture} label={label} />`
 *   Replace `picture` with the image source and `label` with a descriptive label for the image.
 * - Ensure the `productImage.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `alt` attribute is essential for accessibility and should describe the content or purpose of the image.
 * - The `image` class must be styled in the `productImage.css` file to align with the website's design.
 */

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
