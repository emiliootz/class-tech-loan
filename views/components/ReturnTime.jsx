/*
 * Purpose:
 * The `ReturnTime` component renders an input field that allows users to select a return time.
 * It is designed for use in scheduling or booking systems where users need to specify when an
 * item or resource will be returned.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/returnTime.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Includes a `<label>` for the input field to enhance accessibility.
 * - Provides an `<input>` field of type `time` for users to select or enter a return time.
 * - Applies the `return-time` class to the container and `time-input` class to the input field.
 *
 * Usage:
 * - To use this component, include:
 *   `<ReturnTime />`
 * - Ensure the `returnTime.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `id` and `htmlFor` attributes are used to associate the label with the input field for accessibility.
 * - The `returnDate` id can be modified if needed, but should remain consistent with the `htmlFor` attribute.
 * - The `time-input` class should be styled in the `returnTime.css` file for a consistent appearance.
 */

const React = require("react");

function ReturnTime() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/returnTime.css" />
      </head>
      <div className="return-time">
        <label htmlFor="returnDate">
          <strong>Return Time</strong>
        </label>
        <input type="time" id="returnDate" className="time-input" />
      </div>
    </>
  );
}

module.exports = ReturnTime;
