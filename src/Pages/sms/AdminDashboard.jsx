import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../components/sms/AdminSidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, GlassCard, LoadingState, DataTable, Badge } from "../../components/sms/UI/DashboardUI";
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaEllipsisV } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState({ data: [], totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [token, page, search, roleFilter]);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`/api/sms/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      setStats(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch(`/api/sms/admin/users?page=${page}&search=${search}&role=${roleFilter}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUsers(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  if (loading) return <LoadingState message="Calculating metrics..." />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <Topbar title="Admin Command Center" />
        
        <div className="sms-stats-grid">
          <StatCard 
            icon={<FaUsers />} 
            title="Total Users" 
            value={stats?.totalUsers || 0} 
            color="var(--sms-primary)" 
          />
          <StatCard 
            icon={<FaUserGraduate />} 
            title="Students" 
            value={stats?.totalStudents || 0} 
            color="var(--sms-green)" 
          />
          <StatCard 
            icon={<FaChalkboardTeacher />} 
            title="Instructors" 
            value={stats?.totalInstructors || 0} 
            color="var(--sms-yellow)" 
          />
          <StatCard 
            icon={<FaMoneyBillWave />} 
            title="Revenue" 
            value={`Rs. ${stats?.totalRevenue?.toLocaleString() || 0}`} 
            color="var(--sms-primary)" 
          />
        </div>

        <div className="sms-dashboard-sections">
          <GlassCard className="sms-section-full">
            <div className="sms-section-header">
              <h3>User Management</h3>
              <div className="sms-table-actions">
                <input 
                  type="text" 
                  placeholder="Search name or email..." 
                  className="sms-search-input"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                <select 
                  className="sms-role-select" 
                  value={roleFilter}
                  onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Roles</option>
                  <option value="student">Students</option>
                  <option value="instructor">Instructors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>

            <DataTable 
              headers={["User", "Role", "Joined Date", "Actions"]}
              rows={users.data}
              loading={usersLoading}
              renderRow={(u) => (
                <tr key={u._id}>
                  <td>
                    <div className="sms-user-info">
                      <div className="sms-user-name">{u.name}</div>
                      <div className="sms-user-email">{u.email}</div>
                    </div>
                  </td>
                  <td><Badge status={u.role === 'admin' ? 'approved' : u.role === 'instructor' ? 'pending' : 'none'} text={u.role.toUpperCase()} /></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="sms-btn-icon"><FaEllipsisV /></button>
                  </td>
                </tr>
              )}
            />

            {users.totalPages > 1 && (
              <div className="sms-pagination">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="sms-page-btn"
                >
                  Previous
                </button>
                <span>Page {page} of {users.totalPages}</span>
                <button 
                  disabled={page === users.totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="sms-page-btn"
                >
                  Next
                </button>
              </div>
            )}
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
