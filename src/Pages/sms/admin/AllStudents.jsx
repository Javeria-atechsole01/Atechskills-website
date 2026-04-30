import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import { DataTable, Badge, LoadingState, GlassCard } from "../../../components/sms/UI/DashboardUI";
import { FaSearch, FaFileDownload, FaUserEdit, FaTrash } from "react-icons/fa";
import "../../../styles/sms-dashboard.css";

const AllStudents = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/sms/admin/enrolled-students", { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = students.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="sms-page-title">Student Directory</h2>
          <button className="sms-btn-secondary">
            <FaFileDownload /> Export Data
          </button>
        </div>

        <div className="sms-search-wrapper" style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: '500px' }}>
          <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--sms-muted)' }} />
          <input 
            placeholder="Search by name, ID or email..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="sms-form-input"
            style={{ width: '100%', paddingLeft: '3rem', background: 'var(--sms-card)', border: '1px solid var(--sms-card-border)', borderRadius: '0.75rem', height: '45px', color: 'white' }}
          />
        </div>

        <GlassCard>
          <DataTable 
            headers={["Student", "Course Info", "Batch", "Enrollment Date", "Fee Status", "Actions"]}
            rows={filtered}
            renderRow={(s, i) => (
              <tr key={i}>
                <td>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{s.studentId}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{s.selectedCourse?.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sms-primary-accent)' }}>{s.selectedCourse?.track}</div>
                </td>
                <td>{s.batch}</td>
                <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
                <td><Badge status={s.feeStatus || 'pending'} /></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="sms-icon-btn"><FaUserEdit /></button>
                    <button className="sms-icon-btn danger"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            )}
          />
          <div style={{ color: 'var(--sms-muted)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Total Enrolled: {filtered.length}
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

export default AllStudents;
