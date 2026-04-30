import React from "react";
import "../../../styles/sms-dashboard.css";

// 1. GlassCard
export const GlassCard = ({ children, className = "", style = {} }) => (
  <div className={`sms-glass-card ${className}`} style={style}>
    {children}
  </div>
);

// 2. StatCard
export const StatCard = ({ icon, title, value, subValue, color = "var(--sms-primary)" }) => (
  <div className="sms-stat-card">
    <div className="sms-stat-icon" style={{ color }}>{icon}</div>
    <div className="sms-stat-data">
      <h4>{title}</h4>
      <p>{value}</p>
      {subValue && <span className="sms-stat-sub">{subValue}</span>}
    </div>
  </div>
);

// 3. Badge
export const Badge = ({ status, children }) => (
  <span className={`sms-badge badge-${status?.toLowerCase()}`}>
    {children || status}
  </span>
);

// 4. LoadingState
export const LoadingState = ({ message = "Loading..." }) => (
  <div className="sms-loading-container">
    <div className="sms-spinner"></div>
    <p>{message}</p>
  </div>
);

// 5. EmptyState
export const EmptyState = ({ message = "No data available" }) => (
  <div className="sms-empty-state">
    <p>{message}</p>
  </div>
);

// 6. Table Component
export const DataTable = ({ headers, rows, renderRow }) => (
  <div className="sms-table-wrapper">
    <table className="sms-table">
      <thead>
        <tr>
          {headers.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows && rows.length > 0 ? (
          rows.map((row, i) => renderRow(row, i))
        ) : (
          <tr>
            <td colSpan={headers.length} style={{ textAlign: "center", padding: "2rem" }}>
              <EmptyState />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
