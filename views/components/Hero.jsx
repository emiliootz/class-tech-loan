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
