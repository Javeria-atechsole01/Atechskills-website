import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { 
  FaUsers, FaWallet, FaLink, FaCopy, FaCheckCircle, 
  FaClock, FaMousePointer, FaChartLine, FaWhatsapp, FaMedal 
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
    setLoading(true);
    try {
      const response = await fetch("/api/sms/affiliate/dashboard", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyRefLink = () => {
    const link = data?.profile?.referralLink || `${window.location.origin}/sms/signup?ref=${data?.profile?.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const link = data?.profile?.referralLink || `${window.location.origin}/sms/signup?ref=${data?.profile?.referralCode}`;
    const text = `Join AtechSkills and start your journey in AI & Tech! Use my referral link: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) return <div className="sms-loading">Loading Affiliate Portal...</div>;
  if (error) return <div className="sms-loading">Error: {error}</div>;

  const profile = data?.profile;
  const filteredCommissions = data?.recentCommissions?.filter(c => 
    filter === "all" ? true : c.status === filter
  );

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <div className="sms-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Affiliate Dashboard</h2>
          <div className={`sms-tier-badge tier-${profile?.tier || 'bronze'}`}>
            <FaMedal /> {profile?.tier?.toUpperCase() || 'BRONZE'} TIER
          </div>
        </div>
        
        <div className="sms-content-padding">
          <div className="sms-ref-banner">
            <div className="sms-ref-info">
              <h3>Earn 10% Commission 🚀</h3>
              <p>Share your unique link and earn every time someone joins AtechSkills via your referral.</p>
              <div className="sms-copy-field">
                <input readOnly value={profile?.referralLink || `${window.location.origin}/sms/signup?ref=${profile?.referralCode}`} />
                <button onClick={copyRefLink} style={{ background: copied ? 'var(--sms-green)' : 'var(--sms-primary)' }}>
                  {copied ? <FaCheckCircle /> : <FaCopy />} {copied ? "Copied" : "Copy"}
                </button>
                <button onClick={shareWhatsApp} style={{ background: '#25D366', marginLeft: '0.5rem' }}>
                  <FaWhatsapp /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="sms-stats-grid">
            <div className="sms-stat-card">
              <div className="sms-stat-icon"><FaMousePointer /></div>
              <div className="sms-stat-data">
                <h4>Total Clicks</h4>
                <p>{profile?.totalClicks || 0}</p>
              </div>
            </div>
            <div className="sms-stat-card">
              <div className="sms-stat-icon"><FaUsers /></div>
              <div className="sms-stat-data">
                <h4>Conversions</h4>
                <p>{profile?.totalConversions || 0}</p>
              </div>
            </div>
            <div className="sms-stat-card">
              <div className="sms-stat-icon"><FaClock color="var(--sms-yellow)" /></div>
              <div className="sms-stat-data">
                <h4>Pending</h4>
                <p>Rs. {profile?.pendingBalance?.toLocaleString() || 0}</p>
              </div>
            </div>
            <div className="sms-stat-card">
              <div className="sms-stat-icon"><FaCheckCircle color="var(--sms-green)" /></div>
              <div className="sms-stat-data">
                <h4>Approved</h4>
                <p>Rs. {profile?.approvedBalance?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          <div className="sms-dashboard-sections">
            <div className="sms-section-card">
              <div className="sms-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Recent Commissions</h3>
                <div className="sms-tabs">
                  {["all", "pending", "approved", "paid"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`sms-tab-btn ${filter === t ? 'active' : ''}`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="sms-table-wrapper">
                <table className="sms-table">
                  <thead>
                    <tr>
                      <th>Referred Student</th>
                      <th>Commission</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommissions?.map((comm, idx) => (
                      <tr key={idx}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{comm.referredUserId?.name || "Anonymous"}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--sms-muted)' }}>{comm.referredUserId?.email}</div>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--sms-primary-accent)' }}>
                          Rs. {comm.commissionAmount?.toLocaleString()}
                        </td>
                        <td>
                          <span className={`sms-badge badge-${comm.status}`}>
                            {comm.status}
                          </span>
                        </td>
                        <td>{new Date(comm.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {(!filteredCommissions || filteredCommissions.length === 0) && (
                       <tr><td colSpan="4" style={{textAlign:'center', padding: '2rem', color: 'var(--sms-muted)' }}>No commissions found for this filter.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sms-section-card">
              <h3>Recent Traffic</h3>
              <div className="sms-table-wrapper">
                <table className="sms-table">
                  <thead>
                    <tr>
                      <th>Source</th>
                      <th>Device</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.recentClicks?.map((click, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className={`sms-click-dot ${click.convertedToSignup ? 'active' : ''}`}></div>
                          {click.ipAddress}
                        </td>
                        <td className="sms-text-truncate" title={click.userAgent}>
                          {click.userAgent?.split(' ')[0] || "Web"}
                        </td>
                        <td style={{ fontSize: '0.8rem' }}>{new Date(click.clickedAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                    {(!data?.recentClicks || data.recentClicks.length === 0) && (
                       <tr><td colSpan="3" style={{textAlign:'center', padding: '1rem' }}>No traffic yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sms-glass-card" style={{ marginTop: '2rem' }}>
             <h3 style={{ marginTop: 0 }}>How It Works</h3>
             <div className="sms-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div className="sms-step">
                   <div className="sms-step-num">1</div>
                   <h4>Share Your Link</h4>
                   <p>Copy your unique referral link and share it on social media, WhatsApp, or with friends.</p>
                </div>
                <div className="sms-step">
                   <div className="sms-step-num">2</div>
                   <h4>Track Signups</h4>
                   <p>Watch your conversions grow as people register and enroll in our premium tech bootcamps.</p>
                </div>
                <div className="sms-step">
                   <div className="sms-step-num">3</div>
                   <h4>Get Paid</h4>
                   <p>Receive 10% commission on every course fee. Withdraw your earnings directly to your wallet.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
