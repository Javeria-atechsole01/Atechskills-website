import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../components/sms/AdminSidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/sms-dashboard.css";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!token || user?.role !== 'admin') return;

    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl}/api/sms/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));

    fetch(`${apiUrl}/api/sms/admin/pending-approvals`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setPending(data))
      .catch(err => console.error("Error fetching pending approvals:", err));

    fetch(`${apiUrl}/api/sms/admin/enrolled-students?limit=5`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setRecent(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(err => console.error("Error fetching recent students:", err));
  }, [token, user]);

  return (
    <div className="sms-dashboard-bg">
      <AdminSidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Admin Overview" />
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <StatCard title="Total Enrolled" value={stats?.totalEnrolled || 0} />
          <StatCard title="Pending Approvals" value={stats?.pendingApprovals || 0} badgeColor={stats?.pendingApprovals > 0 ? '#ef4444' : '#10B981'} />
          <StatCard title="Fee Collected" value={`PKR ${stats?.feeCollected || 0}`} />
          <StatCard title="Active Courses" value={stats?.activeCourses || 0} />
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <h3 style={{ color: '#6B21A8', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.4rem' }}>Pending Approvals</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {pending.length > 0 ? pending.map((item, i) => (
                <div key={i} style={listItemStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}>{item.studentId?.name || "Unknown Student"}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>{item.courseId?.name || "No Course"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>{new Date(item.submissionDate).toLocaleDateString()}</span>
                    <button style={btnStyle}>Review</button>
                  </div>
                </div>
              )) : <p style={{ color: '#64748B', fontStyle: 'italic' }}>No pending approvals found.</p>}
            </div>
          </div>

          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <h3 style={{ color: '#6B21A8', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.4rem' }}>Recent Enrollments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {recent.length > 0 ? recent.map((item, i) => (
                <div key={i} style={listItemStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}>{item.name}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>{item.selectedCourse?.name || "No Course"}</span>
                  </div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>{new Date(item.enrollmentDate).toLocaleDateString()}</span>
                </div>
              )) : <p style={{ color: '#64748B', fontStyle: 'italic' }}>No recent enrollments found.</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, badgeColor }) => (
  <div className="sms-dashboard-stat-card" style={{ flex: '1 1 200px' }}>
    <div className="sms-dashboard-stat-title">{title}</div>
    <div className="sms-dashboard-stat-value">{value}</div>
    {badgeColor && <span className="sms-dashboard-stat-badge" style={{ background: badgeColor, color: '#fff' }}>{value}</span>}
  </div>
);

const listItemStyle = {
  background: '#6B21A8',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '1rem',
  padding: '1.2rem 1.5rem',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease'
};

const btnStyle = {
  background: '#6B21A8',
  color: '#fff',
  border: 'none',
  borderRadius: '0.6rem',
  padding: '0.4rem 1rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

export default AdminDashboard;
