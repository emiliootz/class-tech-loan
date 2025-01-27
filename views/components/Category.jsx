/*

This is rending a category section that is used to navigate
through the website by linking to specific pages

This is a user friendly view of item categories

The stylesheet for this is under public/css/category.css

Passes in cartCount to keep track of the number of items 
within a users cart

the icon is saved under public/images/cart.png

This can be called by using: "<Category />"

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
