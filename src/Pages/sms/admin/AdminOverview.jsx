import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import "../../../styles/sms-dashboard.css";

const AdminOverview = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl}/api/sms/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setStats);
    fetch(`${apiUrl}/api/sms/admin/pending-approvals`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setPending);
    fetch(`${apiUrl}/api/sms/admin/enrolled-students?limit=5`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setRecent);
  }, [token]);

  return (
    <div className="sms-dashboard-bg">
      <AdminSidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Admin Overview" />
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.2rem' }}>
          <StatCard title="Total Enrolled" value={stats?.totalEnrolled} />
          <StatCard title="Pending Approvals" value={stats?.pendingApprovals} badgeColor={stats?.pendingApprovals > 0 ? '#ef4444' : '#10B981'} />
          <StatCard title="Fee Collected (This Month)" value={`PKR ${stats?.feeCollected || 0}`} />
          <StatCard title="Active Courses/Batches" value={`${stats?.activeCourses || 0} / ${stats?.activeBatches || 0}`} />
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: '#6B21A8', marginBottom: '1rem' }}>Pending Approvals</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pending.map((item, i) => (
                <li key={i} className="sms-purple-card" style={{ marginBottom: '1rem', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{item.studentId?.name} ({item.courseId?.name})</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem' }}>{new Date(item.submissionDate).toLocaleDateString()}</span>
                  <button style={{ background: '#FFFFFF', color: '#6B21A8', border: 'none', borderRadius: '0.7rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Review</button>
                </li>
              ))}
              {pending.length === 0 && <li style={{ color: '#64748B' }}>No pending approvals.</li>}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: '#6B21A8', marginBottom: '1rem' }}>Recent Enrollments</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recent.map((item, i) => (
                <li key={i} className="sms-purple-card" style={{ marginBottom: '1rem', padding: '1rem 1.2rem' }}>
                  <span>{item.name} ({item.selectedCourse?.name})</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', marginLeft: 12 }}>{new Date(item.enrollmentDate).toLocaleDateString()}</span>
                </li>
              ))}
              {recent.length === 0 && <li style={{ color: '#64748B' }}>No recent enrollments.</li>}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

function StatCard({ title, value, badgeColor }) {
  return (
    <div className="sms-dashboard-stat-card" style={{ borderTop: `5px solid #6B21A8` }}>
      <div className="sms-dashboard-stat-title">{title}</div>
      <div className="sms-dashboard-stat-value">{value}</div>
      {badgeColor && <span className="sms-dashboard-stat-badge" style={{ background: badgeColor, color: '#fff' }}>{value}</span>}
    </div>
  );
}

export default AdminOverview;
