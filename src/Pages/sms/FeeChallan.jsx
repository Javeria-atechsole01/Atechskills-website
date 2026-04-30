import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { FaFileInvoice, FaDownload, FaCheckCircle, FaClock } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const FeeChallan = () => {
  const { user, token } = useContext(AuthContext);
  const [challans, setChallans] = useState([]);
  useEffect(() => {
    // In real app, this would be an API call to get student's fee records
    fetch(`/api/sms/enrollment/my-status`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.feeRecord) setChallans([data.feeRecord]);
    });
  }, [token]);

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <main className="sms-main-content">
        <Topbar title="Fee Management" />

        <div className="sms-fee-page">
          <div className="sms-fee-header">
            <h2 className="sms-fee-title">Fee Challans & Payments</h2>
          </div>

          <div className="sms-challan-list">
            {challans.length > 0 ? challans.map((challan, idx) => (
              <div key={idx} className="sms-challan-card">
                <div className="sms-challan-main">
                  <div className="sms-challan-info">
                    <div className="sms-challan-label">Challan Number</div>
                    <div className="sms-challan-number">#{challan.challanNo}</div>
                    <div className="sms-challan-date">Generated: {new Date(challan.submissionDate).toLocaleDateString()}</div>
                  </div>
                  <div className="sms-challan-amount">
                    <div className="sms-challan-label">Total Amount</div>
                    <div className="sms-challan-value">PKR {challan.amount}</div>
                  </div>
                  <div className="sms-challan-status">
                    <div className="sms-challan-label">Status</div>
                    <div className={`sms-status-pill ${challan.status}`}>
                      {challan.status === 'approved' ? <FaCheckCircle /> : <FaClock />}
                      {challan.status.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="sms-challan-footer">
                  <button className="sms-btn-download"><FaDownload /> Download Challan PDF</button>
                  {challan.status === 'pending' && <p className="sms-fee-note">Verification usually takes 24-48 hours.</p>}
                </div>
              </div>
            )) : (
              <div className="sms-no-data">No fee records found.</div>
            )}
          </div>

          <div className="sms-payment-instructions sms-purple-card" style={{ padding: '2rem', marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>How to Pay?</h3>
            <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Download the fee challan PDF using the button above.</li>
              <li>Transfer the amount via Bank Transfer, JazzCash, or EasyPaisa.</li>
              <li>Send the payment screenshot to our official WhatsApp support.</li>
              <li>Once verified, your course access will be activated instantly.</li>
            </ol>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .sms-fee-page { padding: 0; }
        .sms-fee-title { color: var(--sms-text); font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; }
        .sms-challan-card { background: var(--sms-card); backdrop-filter: var(--sms-blur); border-radius: 1.25rem; border: 1px solid var(--sms-card-border); overflow: hidden; margin-bottom: 1.5rem; color: var(--sms-text); }
        .sms-challan-main { display: flex; padding: 2rem; border-bottom: 1px solid var(--sms-card-border); gap: 3rem; }
        .sms-challan-label { font-size: 0.85rem; color: var(--sms-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
        .sms-challan-number { font-size: 1.3rem; font-weight: 700; color: var(--sms-text); }
        .sms-challan-date { font-size: 0.85rem; color: var(--sms-muted); margin-top: 0.3rem; }
        .sms-challan-value { font-size: 1.5rem; font-weight: 800; color: var(--sms-primary-accent); }
        
        .sms-status-pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; font-size: 0.85rem; }
        .sms-status-pill.pending { background: rgba(251, 191, 36, 0.1); color: var(--sms-yellow); }
        .sms-status-pill.approved { background: rgba(16, 185, 129, 0.1); color: var(--sms-green); }
        
        .sms-challan-footer { padding: 1.2rem 2rem; background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; align-items: center; }
        .sms-btn-download { background: var(--sms-primary); color: #fff; border: none; padding: 0.7rem 1.5rem; border-radius: 0.7rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .sms-fee-note { font-size: 0.85rem; color: var(--sms-muted); font-style: italic; }
        
        .sms-purple-card { background: var(--sms-card); border: 1px solid var(--sms-card-border); border-radius: 1.25rem; color: var(--sms-text); }
        
        @media (max-width: 768px) {
          .sms-challan-main { flex-direction: column; gap: 1.5rem; padding: 1.5rem; }
        }
      ` }} />
    </div>
  );
};

export default FeeChallan;
