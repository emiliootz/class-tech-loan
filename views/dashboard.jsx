// views/Dashboard.jsx
const React = require("react");
const Navbar = require("./components/Navbar"); // Top navbar
const Sidebar = require("./components/Sidebar"); // Sidebar with menu links
const Chart = require("./components/Chart"); // Chart component

/**
 * Dashboard page for admin and staff.
 *
 * Props:
 * - isLoggedIn (boolean): Whether the user is logged in.
 * - cartCount (number): The number of items in the user's cart.
 * - isAdmin (boolean): Whether the user is an admin.
 * - dashboardData (array): Data for the chart. Each item should be an object like:
 *       { day: "Monday", loans: 10 }
 */
function Dashboard({
  isLoggedIn,
  cartCount,
  isAdmin,
  isStaff = false,
  dashboardData,
}) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/css/dashboard.css" />
      </head>
      <div title="Dashboard">
        <Navbar
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          isStaff={isStaff}
        />
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-content">
            <h1>Dashboard</h1>
            <Chart data={dashboardData} />
            {/* You can add more dashboard widgets here */}
          </div>
        </div>
      </div>
    </>
  );
}

module.exports = Dashboard;
