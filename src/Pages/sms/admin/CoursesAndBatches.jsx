import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import { LoadingState, GlassCard } from "../../../components/sms/UI/DashboardUI";
import { FaBook, FaPlus, FaUsers, FaArrowRight } from "react-icons/fa";
import "../../../styles/sms-dashboard.css";

const CoursesAndBatches = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sms/enrollment/courses/all", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="sms-page-title">Curriculum & Cohorts</h2>
          <button className="sms-btn-primary">
            <FaPlus /> Create New Course
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {courses.map((c, i) => {
            const progress = (c.enrolledCount / (c.maxSeats || 1)) * 100;
            return (
              <GlassCard key={i} style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '45px', height: '45px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaBook color="var(--sms-primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.1rem' }}>{c.name}</h3>
                    <div style={{ color: 'var(--sms-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                      {c.bootcampType} • {c.track}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <span>Price: <strong style={{ color: 'var(--sms-green)' }}>Rs. {c.fee?.toLocaleString()}</strong></span>
                  <span>Active Batch: <strong>{c.batchNo}</strong></span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--sms-muted)' }}>Enrollment Progress</span>
                    <span><FaUsers style={{ marginRight: '5px' }} /> {c.enrolledCount} / {c.maxSeats}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ 
                      background: progress > 90 ? 'var(--sms-red)' : 'var(--sms-primary)', 
                      height: '100%', 
                      width: `${Math.min(progress, 100)}%`,
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="sms-btn-secondary" style={{ flex: 1 }}>Configure</button>
                  <button className="sms-btn-primary" style={{ flex: 1 }}>
                    Add Batch <FaArrowRight style={{ fontSize: '0.8rem' }} />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CoursesAndBatches;
