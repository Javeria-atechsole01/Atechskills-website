import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaClipboardList, FaChartBar, FaBookOpen, FaClock } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

import CourseSelection from "./CourseSelection";

const StudentDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    
    // If no courses selected, we stay on dashboard but will render CourseSelection
    if (user.enrollmentStatus === "none") return;

    if (user.enrollmentStatus !== "enrolled" && user.enrollmentStatus !== "pending") {
      navigate("/sms/enrollment-status");
      return;
    }

    // Fetch dashboard data
    fetch(`/api/sms/dashboard/overview`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setDashboard)
      .catch(err => console.error("Error fetching dashboard:", err));
  }, [user, token, navigate]);


  if (!user) return null;

  // Render Course Selection UI directly if new student
  if (user.enrollmentStatus === "none") {
    return <CourseSelection />;
  }

  // Render full dashboard for enrolled students
  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <main className="sms-main-content">
        <Topbar title="Dashboard" batch={dashboard?.batchNo || user?.batch} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--sms-text)', fontWeight: 700 }}>Welcome Back, {user.name.split(' ')[0]}!</h2>
          <button 
            onClick={() => navigate("/sms/select-courses")}
            className="sms-btn-primary"
            style={{ padding: '0.7rem 1.5rem', borderRadius: '0.8rem' }}
          >
            + Add New Course
          </button>
        </div>

        <div className="sms-stats-grid">
           <div className="sms-stat-card">
              <div className="sms-stat-icon"><FaBookOpen /></div>
              <div className="sms-stat-data">
                <h4>Courses Enrolled</h4>
                <p>{dashboard?.coursesCount || 0}</p>
                <span className="sms-stat-sub">
                  {dashboard?.courseName ? (dashboard.coursesCount > 1 ? `${dashboard.courseName} & more` : dashboard.courseName) : "-"}
                </span>
              </div>
           </div>

           <div className="sms-stat-card">
              <div className="sms-stat-icon" style={{ color: dashboard?.feeStatus === "approved" ? 'var(--sms-green)' : 'var(--sms-yellow)' }}>
                {dashboard?.feeStatus === "approved" ? <FaCheckCircle /> : <FaClock />}
              </div>
              <div className="sms-stat-data">
                <h4>Fee Status</h4>
                <p>{dashboard?.feeStatus === "approved" ? "Approved" : "Pending"}</p>
                <span className="sms-stat-sub">Batch: {dashboard?.batchNo || user?.batch || "-"}</span>
              </div>
           </div>

           <div className="sms-stat-card">
              <div className="sms-stat-icon" style={{ color: 'var(--sms-yellow)' }}><FaClipboardList /></div>
              <div className="sms-stat-data">
                <h4>Pending Tasks</h4>
                <p>{dashboard?.pendingAssignments?.count || 0}</p>
                <span className="sms-stat-sub">
                  {dashboard?.pendingAssignments?.nextDue ? `Due: ${dashboard.pendingAssignments.nextDue}` : "No Pending"}
                </span>
              </div>
           </div>

           <div className="sms-stat-card">
              <div className="sms-stat-icon" style={{ color: 'var(--sms-primary-accent)' }}><FaChartBar /></div>
              <div className="sms-stat-data">
                <h4>Results</h4>
                <p>{dashboard?.resultsAvailable ? "Available" : "No Yet"}</p>
                <span className="sms-stat-sub">Instructor: {dashboard?.instructorName || "-"}</span>
              </div>
           </div>
        </div>

        <div className="sms-glass-card" style={{ marginTop: '2rem' }}>
          <h3>Recent Activity</h3>
          <ul className="sms-dashboard-activity-list" style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
            {(dashboard?.activityFeed || []).map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--sms-card-border)' }}>
                <span style={{ color: 'var(--sms-primary-accent)' }}>{getActivityIcon(item.type)}</span>
                <span style={{ color: 'var(--sms-text)' }}>{item.text}</span>
              </li>
            ))}
            {(!dashboard?.activityFeed || dashboard.activityFeed.length === 0) && (
              <li style={{ color: 'var(--sms-muted)', padding: '1rem 0' }}>No recent activity to show.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

function getActivityIcon(type) {
  switch (type) {
    case "assignment": return <FaClipboardList />;
    case "result": return <FaChartBar />;
    case "fee": return <FaBookOpen />;
    case "approved": return <FaCheckCircle style={{ color: '#10B981' }} />;
    case "pending": return <FaExclamationCircle style={{ color: '#fbbf24' }} />;
    case "time": return <FaClock />;
    default: return <FaClipboardList />;
  }
}

export default StudentDashboard;
