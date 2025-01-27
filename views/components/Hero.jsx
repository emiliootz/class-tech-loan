/*

This is rending the hero section to be used mainly in the index 
and protected pages in the website

The stylesheet for this is under public/css/hero.css

This can be called by using: "<Hero />"

*/

const React = require("react");

function Hero() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/hero.css" />
      </head>
      <main>
        <div className="dark-overlay"></div>
        <div className="main-intro">
          <h1>
            Borrow
            <br />
            &nbsp; &nbsp; &nbsp;Equipment at
            <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Umass Boston
          </h1>
        </div>
      </main>
    </>
  );
}

module.exports = Hero;
