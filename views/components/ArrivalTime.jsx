/*
 * Purpose:
 * The `ArrivalTime` component renders a time input field where users can specify
 * an arrival time. It includes a label for accessibility and styling, making it
 * a reusable component for scheduling or booking functionality.
 *
 * Dependencies:
 * - React: Required to create the functional component.
 * - CSS Stylesheet: The styles for this component are defined in `/public/css/arrivalTime.css`,
 *   and the stylesheet is dynamically linked within this component.
 *
 * Features:
 * - Includes a label (`<label>`) for the input field, enhancing accessibility.
 * - Provides an input field of type `time` for users to select or enter a time.
 * - Styled with the class `arrival-time` for the container and `time-input` for the input field.
 *
 * Usage:
 * - To use this component, include:
 *   `<ArrivalTime />`
 * - Ensure the `arrivalTime.css` file exists in `/public/css/` and contains the required styles.
 *
 * Notes:
 * - The `id` and `htmlFor` attributes are used to associate the label with the input field, improving accessibility.
 * - The `arrivalDate` id can be customized if needed, but it should remain consistent with the associated `htmlFor` attribute.
 * - The `time-input` class should be styled in the `arrivalTime.css`.
 */

const React = require("react");

function ArrivalTime() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/arrivalTime.css" />
      </head>
      <div className="arrival-time">
        <label htmlFor="arrivalDate">
          <strong>Arrival Time</strong>
        </label>
        <input type="time" id="arrivalDate" className="time-input" />
      </div>
    </>
  );
}

module.exports = ArrivalTime;
