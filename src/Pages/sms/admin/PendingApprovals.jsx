import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import { DataTable, Badge, LoadingState, GlassCard } from "../../../components/sms/UI/DashboardUI";
import { FaSearch, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import "../../../styles/sms-dashboard.css";

const PendingApprovals = () => {
  const { token } = useContext(AuthContext);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/sms/admin/pending-approvals", { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(res => res.json())
      .then(data => setPending(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = pending.filter(item => {
    const matchesFilter = filter === "all" ? true : item.status === filter;
    const matchesSearch = (item.studentId?.name || '').toLowerCase().includes(search.toLowerCase()) || 
                         (item.studentId?.studentId || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = async (id, status) => {
    // Add API logic here
    console.log(`Action: ${status} for ID: ${id}`);
  };

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <Topbar title="Enrollment Approvals" />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="sms-filter-tabs">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="sms-search-wrapper" style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--sms-muted)' }} />
            <input 
              placeholder="Search student or ID..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="sms-form-input"
              style={{ width: '100%', paddingLeft: '3rem', background: 'var(--sms-card)', border: '1px solid var(--sms-card-border)', borderRadius: '0.75rem', height: '45px', color: 'white' }}
            />
          </div>
        </div>

        <GlassCard>
          <DataTable 
            headers={["Student", "Course", "Amount", "Date", "Status", "Proof", "Actions"]}
            rows={filtered}
            renderRow={(item, i) => (
              <tr key={i}>
                <td>
                  <div style={{ fontWeight: 600 }}>{item.studentId?.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{item.studentId?.studentId}</div>
                </td>
                <td>{item.courseId?.name}</td>
                <td style={{ fontWeight: 700 }}>Rs. {item.amount?.toLocaleString()}</td>
                <td>{new Date(item.submissionDate).toLocaleDateString()}</td>
                <td><Badge status={item.status} /></td>
                <td>
                  {item.paymentProofUrl ? (
                    <a href={item.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="sms-icon-btn">
                      <FaEye />
                    </a>
                  ) : 'N/A'}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="sms-icon-btn success" onClick={() => handleAction(item._id, 'approved')}><FaCheck /></button>
                    <button className="sms-icon-btn danger" onClick={() => handleAction(item._id, 'rejected')}><FaTimes /></button>
                  </div>
                </td>
              </tr>
            )}
          />
        </GlassCard>
      </main>
    </div>
  );
};

export default PendingApprovals;
