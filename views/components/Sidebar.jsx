// views/components/Sidebar.jsx
const React = require("react");

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/dashboard/customers">Customers</a>
        </li>
        <li>
          <a href="/dashboard/items">Items</a>
        </li>
        <li>
          <a href="/dashboard/reports">Reports</a>
        </li>
      </ul>
    </div>
  );
}

module.exports = Sidebar;
