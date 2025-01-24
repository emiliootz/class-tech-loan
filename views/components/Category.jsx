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
