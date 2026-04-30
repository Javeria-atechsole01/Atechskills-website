import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, LoadingState, GlassCard } from "../../components/sms/UI/DashboardUI";
import { FaUserGraduate, FaBook, FaWallet, FaClock } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const InstructorDashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/sms/instructor/dashboard", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      setStats(await res.json());
    } finally { setLoading(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <Topbar title="Instructor Analytics" />
        
        <div className="sms-stats-grid">
          <StatCard icon={<FaWallet />} title="Total Revenue" value={`Rs. ${stats?.totalEarnings?.toLocaleString() || 0}`} />
          <StatCard icon={<FaClock />} title="Pending Clearance" value={`Rs. ${stats?.pendingEarnings?.toLocaleString() || 0}`} color="var(--sms-yellow)" />
          <StatCard icon={<FaUserGraduate />} title="Total Students" value={stats?.totalStudents || 0} color="var(--sms-green)" />
          <StatCard icon={<FaBook />} title="Active Courses" value={stats?.totalCourses || 0} color="var(--sms-primary-accent)" />
        </div>

        <GlassCard>
          <h3>Monthly Overview</h3>
          <p style={{ color: 'var(--sms-muted)' }}>Revenue charts and student growth graphs will appear here as more data is collected.</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default InstructorDashboard;
