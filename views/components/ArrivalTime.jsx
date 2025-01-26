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
