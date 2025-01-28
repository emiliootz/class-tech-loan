/*
 * Purpose:
 * The `Hero` component renders the hero section for the website.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/hero.css`, and the stylesheet
 *   is dynamically linked within this component.
 *
 * Features:
 * - Includes a `dark-overlay` div to create a darkened background effect.
 * - Displays an introductory message in the `main-intro` div, styled to emphasize the purpose of the website.
 *
 * Usage:
 * - This component can be used in any part of the application by including:
 *   `<Hero />`
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
