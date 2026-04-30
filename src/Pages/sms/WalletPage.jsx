import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { 
  FaMoneyBillWave, FaExchangeAlt, FaArrowDown, FaArrowUp, 
  FaClock, FaCheckCircle, FaExclamationTriangle, FaUniversity 
} from "react-icons/fa";
import "../../styles/sms-dashboard.css";
import "../../styles/sms-affiliate.css";

const WalletPage = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("easypaisa");
  const [accountDetails, setAccountDetails] = useState({ accountName: "", accountNumber: "", bankName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const response = await fetch("/api/sms/affiliate/wallet", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (Number(amount) < 500) {
      setMessage({ type: "error", text: "Minimum withdrawal amount is Rs. 500" });
      return;
    }
    if (Number(amount) > data?.approvedBalance) {
      setMessage({ type: "error", text: "Insufficient approved balance" });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const response = await fetch("/api/sms/affiliate/payout/request", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`
        },
        body: JSON.stringify({ amount: Number(amount), method, accountDetails })
      });
      const res = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Payout request submitted successfully!" });
        setAmount("");
        fetchWallet();
      } else {
        setMessage({ type: "error", text: res.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="sms-loading">Loading Wallet Data...</div>;
  if (error) return <div className="sms-loading">Error: {error}</div>;

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <Topbar title="My Wallet" />
        
        <div className="sms-content-padding">
          <div className="sms-wallet-grid">
            <div className="sms-wallet-stats">
              <div className="sms-balance-card primary">
                <div className="sms-balance-content">
                  <span>Available for Withdrawal</span>
                  <h2>Rs. {data?.approvedBalance?.toLocaleString() || 0}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
                    <FaCheckCircle /> Verified Earnings
                  </div>
                </div>
                <FaMoneyBillWave className="sms-wallet-bg-icon" />
              </div>
              
              <div className="sms-balance-subgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="sms-balance-card secondary" style={{ background: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                  <div>
                    <span style={{ color: 'var(--sms-yellow)' }}>Pending</span>
                    <h4 style={{ margin: '0.5rem 0' }}>Rs. {data?.pendingBalance?.toLocaleString() || 0}</h4>
                  </div>
                  <FaClock color="var(--sms-yellow)" />
                </div>
                <div className="sms-balance-card secondary" style={{ background: 'rgba(148, 163, 184, 0.05)', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                  <div>
                    <span style={{ color: 'var(--sms-muted)' }}>Withdrawn</span>
                    <h4 style={{ margin: '0.5rem 0' }}>Rs. {data?.withdrawnBalance?.toLocaleString() || 0}</h4>
                  </div>
                  <FaCheckCircle color="var(--sms-muted)" />
                </div>
              </div>
            </div>
            
            <div className="sms-withdraw-card sms-glass-card">
              <h3 style={{ marginTop: 0 }}>Request Payout</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--sms-muted)', marginBottom: '1.5rem' }}>
                <FaExclamationTriangle color="var(--sms-yellow)" /> Min. withdrawal amount is Rs. 500
              </p>
              
              <form onSubmit={handleWithdraw}>
                <div className="sms-form-group">
                  <label>Amount (PKR)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                    required 
                    min="500" 
                    max={data?.approvedBalance}
                    placeholder="Enter amount" 
                  />
                </div>
                
                <div className="sms-form-group">
                  <label>Payout Method</label>
                  <div className="sms-method-selector" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    {['easypaisa', 'jazzcash', 'bank_transfer'].map(m => (
                      <button 
                        key={m}
                        type="button"
                        onClick={() => setMethod(m)}
                        className={`sms-method-btn ${method === m ? 'active' : ''}`}
                        style={{
                          padding: '0.75rem 0.25rem',
                          borderRadius: '0.5rem',
                          border: '1px solid var(--sms-card-border)',
                          background: method === m ? 'var(--sms-primary)' : 'transparent',
                          color: method === m ? 'white' : 'var(--sms-muted)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {m.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sms-form-row">
                  <div className="sms-form-group">
                    <label>Account Name</label>
                    <input 
                      type="text" 
                      value={accountDetails.accountName} 
                      onChange={e => setAccountDetails({...accountDetails, accountName: e.target.value})} 
                      required 
                      placeholder="Title of account" 
                    />
                  </div>
                  <div className="sms-form-group">
                    <label>Account Number</label>
                    <input 
                      type="text" 
                      value={accountDetails.accountNumber} 
                      onChange={e => setAccountDetails({...accountDetails, accountNumber: e.target.value})} 
                      required 
                      placeholder={method === 'bank_transfer' ? "IBAN / Acc No" : "03xx-xxxxxxx"} 
                    />
                  </div>
                </div>

                {method === 'bank_transfer' && (
                  <div className="sms-form-group">
                    <label>Bank Name</label>
                    <input 
                      type="text" 
                      value={accountDetails.bankName} 
                      onChange={e => setAccountDetails({...accountDetails, bankName: e.target.value})} 
                      required 
                      placeholder="e.g. Meezan Bank, HBL" 
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="sms-btn-primary" 
                  disabled={submitting || !data?.approvedBalance || data.approvedBalance < 500}
                  style={{ opacity: (submitting || data.approvedBalance < 500) ? 0.5 : 1 }}
                >
                  {submitting ? "Processing..." : "Submit Payout Request"}
                </button>
                
                {message.text && (
                  <div className={`sms-alert alert-${message.type}`} style={{ padding: '0.75rem', marginTop: '1rem' }}>
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="sms-section-card" style={{ marginTop: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 style={{ margin: 0 }}>Transaction History</h3>
               <FaExchangeAlt color="var(--sms-primary)" />
            </div>
            
            <div className="sms-table-wrapper">
              <table className="sms-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Source / Description</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.transactions?.map((tx, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="sms-tx-type">
                          {tx.type === 'credit' ? <FaArrowUp color="var(--sms-green)" /> : <FaArrowDown color="var(--sms-red)" />}
                          <span style={{ color: tx.type === 'credit' ? 'var(--sms-green)' : 'var(--sms-red)' }}>
                            {tx.type.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700 }}>
                         Rs. {tx.amount?.toLocaleString()}
                      </td>
                      <td style={{ fontSize: '0.9rem', color: 'var(--sms-muted)' }}>
                        {tx.description || tx.source}
                      </td>
                      <td>
                        <span className={`sms-badge badge-${tx.status}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {(!data?.transactions || data.transactions.length === 0) && (
                     <tr><td colSpan="5" style={{textAlign:'center', padding: '2rem', color: 'var(--sms-muted)' }}>No transactions found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
