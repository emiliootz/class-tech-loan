// views/components/Chart.jsx
const React = require("react");

function Chart({ data }) {
  // Example: data is an array of objects: [{ day: "Monday", loans: 10 }, ...]
  const svgWidth = 500;
  const svgHeight = 300;
  const barWidth = 40;
  const gap = 20;
  const bottomPadding = 20;
  const maxBarHeight = svgHeight - bottomPadding - 20; // leaving some top padding

  // Find the maximum loans value for scaling
  const maxLoans = Math.max(...data.map((point) => point.loans));

  return (
    <div className="chart">
      <h2>Loans by Weekday</h2>
      <svg width={svgWidth} height={svgHeight}>
        {data.map((point, index) => {
          // Scale bar height relative to maxLoans
          const barHeight = (point.loans / maxLoans) * maxBarHeight;
          const x = index * (barWidth + gap) + 50;
          const y = svgHeight - barHeight - bottomPadding;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#005a8b"
            />
          );
        })}
        {data.map((point, index) => {
          const x = index * (barWidth + gap) + 50 + barWidth / 2;
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={svgHeight - 5}
              textAnchor="middle"
              fontSize="12"
              fill="#333"
            >
              {point.day}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

module.exports = Chart;
