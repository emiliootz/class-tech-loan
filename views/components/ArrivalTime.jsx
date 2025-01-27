/*
  
  This function is rendering the arrival time component
  the stylesheet for this is under public/css/arrivalTime.css

  to call this within a page you will use: "<ArrivalTime />"
  
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
