const React = require("react");

/**
 * TimePicker Component
 *
 * - Renders a labeled `<input type="time">` field.
 * - Can be used for Arrival Time, Return Time, or any other time selection.
 *
 * Props:
 * - `label` (string): The text to display above the input field (e.g., "Arrival Time", "Return Time").
 * - `id` (string): The unique identifier for the input field.
 *
 * Usage:
 * - `<TimePicker label="Arrival Time" id="arrivalDate" />`
 * - `<TimePicker label="Return Time" id="returnDate" />`
 */

function TimePicker({ label, id }) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/timePicker.css" />
      </head>
      <div className="time-picker">
        <label htmlFor={id}>
          <strong>{label}</strong>
        </label>
        <input type="time" id={id} name={id} className="time-input" />
      </div>
    </>
  );
}

module.exports = TimePicker;
