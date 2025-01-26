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
