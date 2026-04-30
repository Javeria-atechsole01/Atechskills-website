import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../components/sms/AdminSidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, GlassCard, LoadingState } from "../../components/sms/UI/DashboardUI";
import "../../styles/sms-dashboard.css";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || user?.role !== 'admin') return;

    const fetchAll = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const [statsRes, pendingRes, recentRes] = await Promise.all([
          fetch(`${apiUrl}/api/sms/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${apiUrl}/api/sms/admin/pending-approvals`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${apiUrl}/api/sms/admin/enrolled-students?limit=5`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setStats(await statsRes.json());
        setPending(await pendingRes.json());
        setRecent(await recentRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token, user]);

  if (loading) return <LoadingState message="Calculating metrics..." />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <Topbar title="Admin Command Center" />
        
        <div className="sms-stats-grid">
          <StatCard title="Total Enrolled" value={stats?.totalEnrolled || 0} />
          <StatCard title="Pending Approvals" value={stats?.pendingApprovals || 0} color={stats?.pendingApprovals > 0 ? 'var(--sms-red)' : 'var(--sms-green)'} />
          <StatCard title="Revenue Collected" value={`Rs. ${stats?.feeCollected?.toLocaleString() || 0}`} color="var(--sms-green)" />
          <StatCard title="Active Courses" value={stats?.activeCourses || 0} color="var(--sms-primary-accent)" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <GlassCard>
            <h3 style={{ marginBottom: '1.5rem' }}>Pending Requests</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pending.length > 0 ? pending.map((item, i) => (
                <div key={i} className="sms-list-item">
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.studentId?.name || "Unknown"}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{item.courseId?.name}</div>
                  </div>
                  <button className="sms-btn-small">Review</button>
                </div>
              )) : <p className="sms-empty">No pending tasks.</p>}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Enrollments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recent.length > 0 ? recent.map((item, i) => (
                <div key={i} className="sms-list-item">
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{item.selectedCourse?.name}</div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{new Date(item.enrollmentDate).toLocaleDateString()}</span>
                </div>
              )) : <p className="sms-empty">No recent data.</p>}
            </div>
          </GlassCard>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .sms-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 0.75rem;
          border: 1px solid var(--sms-card-border);
        }
        .sms-btn-small {
          background: var(--sms-primary);
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }
        .sms-empty {
          color: var(--sms-muted);
          font-style: italic;
          text-align: center;
          padding: 2rem 0;
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
