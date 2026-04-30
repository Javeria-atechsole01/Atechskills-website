import React from "react";
import { FaBell } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const Topbar = ({ breadcrumb, title, batch }) => (
  <div className="sms-dashboard-topbar">
    <div className="sms-dashboard-breadcrumb">{title || breadcrumb}</div>
    <div className="sms-dashboard-actions">
      <div className="sms-dashboard-notify">
        <FaBell />
      </div>
      {batch && (
        <span className="sms-dashboard-batch-badge">
          Batch {batch}
        </span>
      )}
    </div>
  </div>
);

export default Topbar;
