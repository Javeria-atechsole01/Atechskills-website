import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
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
    <div className="sms-dashboard-bg">
      <Sidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Enrollment Status" />
        <div style={{ background: '#1E1B2E', border: '1.5px solid #2D2A40', borderRadius: '1.1rem', padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: status.color, marginBottom: '1.5rem' }}>{status.title}</h2>
          <p style={{ color: '#F8FAFC', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{status.message}</p>
          <div style={{ marginTop: '2rem' }}>
            <button 
              onClick={() => window.location.href = 'https://wa.me/923253344552'}
              style={{ background: '#6B21A8', color: '#fff', border: 'none', borderRadius: '0.8rem', padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentStatus;
