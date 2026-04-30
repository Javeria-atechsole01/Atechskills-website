import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { GlassCard } from "../../components/sms/UI/DashboardUI";
import "../../styles/sms-dashboard.css";

const EnrollmentStatus = () => {
  const { user } = useContext(AuthContext);

  const getStatusMessage = () => {
    switch (user?.enrollmentStatus) {
      case "pending_payment":
        return {
          title: "Payment Pending",
          message: "Your application is received. Please submit your fee to access the full dashboard.",
          color: "#f59e0b"
        };
      case "rejected":
        return {
          title: "Application Rejected",
          message: "We regret to inform you that your application has been rejected. Please contact support for more details.",
          color: "#ef4444"
        };
      default:
        return {
          title: "Enrollment in Progress",
          message: "Your application is being reviewed. Please check back later.",
          color: "#3b82f6"
        };
    }
  };

  const status = getStatusMessage();

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <main className="sms-main-content">
        <Topbar title="Enrollment Status" />
        <GlassCard style={{ textAlign: 'center', marginTop: '2rem', padding: '4rem' }}>
          <h2 style={{ color: status.color, marginBottom: '1.5rem', fontSize: '2rem' }}>{status.title}</h2>
          <p style={{ color: 'var(--sms-text)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>{status.message}</p>
          <div style={{ marginTop: '2.5rem' }}>
            <button 
              onClick={() => window.location.href = 'https://wa.me/923253344552'}
              className="sms-btn-primary"
              style={{ padding: '0.9rem 2.5rem', borderRadius: '1rem' }}
            >
              Contact Support
            </button>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

export default EnrollmentStatus;
