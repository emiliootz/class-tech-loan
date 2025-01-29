/*
 * Purpose:
 * The `NavLinks` component renders the primary navigation links for the website.
 * It provides an organized list of links to essential sections such as Services,
 * Projects, and About.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/navLinks.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Renders an unordered list (`<ul>`) of navigation links.
 * - Uses a `nav__links` class to style the navigation list.
 * - Includes placeholder links (`#`) for Services, Projects, and About sections, which can be replaced with actual URLs.
 *
 * Usage:
 * - To use this component, include:
 *   `<NavLinks />`
 *
 * Notes:
 * - The `<a>` elements contain placeholder `href="#"` attributes, which should be updated with actual URLs.
 * - The `nav__links` class must be styled in the `navLinks.css` file to match the website's design.
 */

const React = require("react");

function NavLinks() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/navLinks.css" />
      </head>
      <nav>
        <ul className="nav__links">
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

module.exports = NavLinks;
