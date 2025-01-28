/*
 * Purpose:
 * The `Category` component provides a user-friendly interface for navigating through
 * different item categories on the website. It is designed to enhance the user experience
 * by organizing items into clear and visually distinct categories.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/category.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Displays a section titled "CATEGORIES".
 * - Includes clickable category boxes for navigating to specific item categories, such as "Video," "Audio," "Photo," and "Dongle."
 * - Each category box contains a dark overlay and a heading.
 *
 * Usage:
 * - This component can be used anywhere in the application by including:
 *   `<Category />`
 * - Replace `#` in the `href` attributes of the category links with actual URLs for each category.
 */

const React = require("react");

function Category() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/category.css" />
      </head>
      <section className="category">
        <p>CATEGORIES</p>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Video</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Audio</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Photo</h3>
        </a>
        <a href="#" className="category-box">
          <div className="dark-overlay"></div>
          <h3>Dongle</h3>
        </a>
      </section>
    </>
  );
}

module.exports = Category;
