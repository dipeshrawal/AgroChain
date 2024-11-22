import React from "react";
import "../../src/Styles/UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <div className="section">
        <button className="section-btn">
          <i className="fas fa-chart-line"></i> Rate of Products
        </button>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wheat</td>
              <td>$25/ton</td>
            </tr>
            <tr>
              <td>Rice</td>
              <td>$30/ton</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <button className="section-btn">
          <i className="fas fa-user-friends"></i> Farmer Data
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Texas</td>
              <td>123-456-7890</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>California</td>
              <td>987-654-3210</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <button className="section-btn">
          <i className="fas fa-store"></i> Retailer Data
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Retail Store A</td>
              <td>New York</td>
              <td>123-000-1111</td>
            </tr>
            <tr>
              <td>Retail Store B</td>
              <td>Chicago</td>
              <td>222-333-4444</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
