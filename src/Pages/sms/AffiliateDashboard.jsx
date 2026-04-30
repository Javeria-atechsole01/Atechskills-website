import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, Badge, LoadingState, DataTable, GlassCard } from "../../components/sms/UI/DashboardUI";
import { 
  FaUsers, FaWallet, FaCopy, FaCheckCircle, 
  FaClock, FaMousePointer, FaWhatsapp, FaMedal 
} from "react-icons/fa";
import "../../styles/sms-dashboard.css";
import "../../styles/sms-affiliate.css";

const AffiliateDashboard = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/sms/affiliate/dashboard", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      if (!response.ok) throw new Error("Could not load affiliate data");
      setData(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/sms/signup?ref=${data?.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingState message="Fetching affiliate stats..." />;

  const filteredCommissions = data?.commissions?.filter(c => 
    filter === "all" ? true : c.status === filter
  );

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="sms-page-title">Affiliate Portal</h2>
          <div className={`sms-tier-badge tier-${data?.tier || 'bronze'}`}>
            <FaMedal /> {data?.tier?.toUpperCase()} TIER
          </div>
        </div>

        <div className="sms-ref-banner">
          <div className="sms-ref-info">
            <h3>Boost Your Earnings 🚀</h3>
            <p>Invite friends and earn 10% on every enrollment.</p>
            {data?.referralCode ? (
              <div className="sms-copy-field-container">
                <div className="sms-copy-field">
                  <input readOnly value={`${window.location.origin}/sms/signup?ref=${data?.referralCode}`} />
                  <button onClick={copyLink} className="sms-btn-copy">
                    {copied ? <FaCheckCircle /> : <FaCopy />} {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <a 
                    href={`https://wa.me/?text=Check%20out%20AtechSkills%20for%20amazing%20IT%20bootcamps!%20Join%20using%20my%20link:%20${window.location.origin}/sms/signup?ref=${data?.referralCode}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="sms-btn-whatsapp"
                  >
                    <FaWhatsapp /> Share on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="sms-ref-skeleton">Generating your unique link...</div>
            )}
          </div>
        </div>

        <div className="sms-stats-grid">
          <StatCard icon={<FaMousePointer />} title="Total Clicks" value={data?.clicks || 0} />
          <StatCard icon={<FaUsers />} title="Conversions" value={data?.conversions || 0} />
          <StatCard icon={<FaWallet />} title="Total Earned" value={`Rs. ${data?.earnings?.toLocaleString() || 0}`} color="var(--sms-green)" />
        </div>

        <div className="sms-dashboard-sections">
          <GlassCard className="sms-section-full">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3>Recent Commissions</h3>
              <div className="sms-filter-tabs">
                {['all', 'pending', 'approved'].map(t => (
                  <button key={t} onClick={() => setFilter(t)} className={filter === t ? 'active' : ''}>
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <DataTable 
              headers={["Student", "Amount", "Status", "Date"]}
              rows={filteredCommissions}
              renderRow={(row, i) => (
                <tr key={i}>
                  <td>{row.referredUserId?.name}</td>
                  <td>Rs. {row.commissionAmount?.toLocaleString()}</td>
                  <td><Badge status={row.status} /></td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                </tr>
              )}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
