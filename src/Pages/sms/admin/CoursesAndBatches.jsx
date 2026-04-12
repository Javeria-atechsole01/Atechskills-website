import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import "../../../styles/sms-dashboard.css";

const CoursesAndBatches = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/sms/courses/all", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setCourses);
  }, [token]);

  return (
    <div className="sms-dashboard-bg">
      <AdminSidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Courses & Batches" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {courses.map((c, i) => (
            <div key={i} className="sms-purple-card" style={{ padding: '1.5rem', minWidth: 320, position: 'relative' }}>
              <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{c.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', marginBottom: '1rem' }}>{c.bootcampType === 'short' ? 'Short Bootcamp' : 'Complete Bootcamp'} {c.track && `- ${c.track}`}</div>
              <div style={{ marginBottom: '0.3rem' }}>Fee: <span style={{ color: '#FFFFFF', fontWeight: 700 }}>PKR {c.fee}</span></div>
              <div style={{ marginBottom: '0.3rem' }}>Batch: <span style={{ fontWeight: 600 }}>{c.batchNo}</span></div>
              <div style={{ marginBottom: '0.8rem' }}>Enrolled: <span style={{ color: '#10B981', fontWeight: 700 }}>{c.enrolledCount}</span> / {c.maxSeats}</div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '0.5rem', height: 10, margin: '1rem 0', width: '100%' }}>
                <div style={{ background: '#FFFFFF', height: 10, borderRadius: '0.5rem', width: `${(c.enrolledCount / (c.maxSeats || 1)) * 100}%` }}></div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                <button style={{ background: '#FFFFFF', color: '#6B21A8', border: 'none', borderRadius: '0.7rem', padding: '0.6rem 1.2rem', fontWeight: 700, cursor: 'pointer', flex: 1 }}>Edit</button>
                <button style={{ background: '#10B981', color: '#fff', border: 'none', borderRadius: '0.7rem', padding: '0.6rem 1.2rem', fontWeight: 700, cursor: 'pointer', flex: 1 }}>Add Batch</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesAndBatches;
