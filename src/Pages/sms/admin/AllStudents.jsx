import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import "../../../styles/sms-dashboard.css";

const AllStudents = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("/api/sms/admin/enrolled-students", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setStudents);
  }, [token]);

  const filtered = students.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sms-dashboard-bg">
      <AdminSidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="All Students" />
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <input placeholder="Search by name or ID" value={search} onChange={e => setSearch(e.target.value)} className="sms-input-purple" style={{ marginRight: 'auto' }} />
          <button style={{ background: 'linear-gradient(90deg,#6B21A8,#7C3AED)', color: '#fff', border: 'none', borderRadius: '0.7rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
        </div>
        <table className="sms-table-purple">
          <thead>
            <tr>
              <th style={{ padding: '0.7rem' }}>Student ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Track</th>
              <th>Batch</th>
              <th>Enrollment Date</th>
              <th>Fee Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={i}>
                <td style={{ padding: '0.7rem' }}>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.selectedCourse?.name}</td>
                <td>{s.selectedCourse?.track}</td>
                <td>{s.batch}</td>
                <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
                <td>{s.feeStatus || '-'}</td>
                <td>
                  <button style={{ background: '#FFFFFF', color: '#6B21A8', border: 'none', borderRadius: '0.7rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>View Profile</button>
                  <button style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '0.7rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>View Challan</button>
                  <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.7rem', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Deactivate</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>No students found.</td></tr>}
          </tbody>
        </table>
        <div style={{ color: '#94A3B8', marginTop: '1.2rem' }}>Showing {filtered.length} enrolled students</div>
      </main>
    </div>
  );
};

export default AllStudents;
