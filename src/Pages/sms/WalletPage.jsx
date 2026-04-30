import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, Badge, LoadingState, DataTable, GlassCard } from "../../components/sms/UI/DashboardUI";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaExchangeAlt, FaHistory } from "react-icons/fa";
import "../../styles/sms-dashboard.css";
import "../../styles/sms-affiliate.css";

const WalletPage = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ amount: "", method: "easypaisa", accountName: "", accountNumber: "", bankName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => { fetchWallet(); }, []);

  const fetchWallet = async () => {
    try {
      const res = await fetch("/api/sms/wallet", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      setData(await res.json());
    } finally { setLoading(false); }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    if (form.amount < 500) return setMsg({ type: "error", text: "Min withdrawal Rs. 500" });
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/sms/wallet/payout/request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: form.amount, method: form.method, accountDetails: form })
      });
      if (res.ok) {
        setMsg({ type: "success", text: "Request submitted!" });
        setForm({ amount: "", method: "easypaisa", accountName: "", accountNumber: "", bankName: "" });
        fetchWallet();
      } else {
        const errData = await res.json();
        setMsg({ type: "error", text: errData.message || "Request failed" });
      }
    } finally { setSubmitting(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <Topbar title="My Financials" />

        <div className="sms-stats-grid">
          <StatCard icon={<FaMoneyBillWave />} title="Available Balance" value={`Rs. ${data?.balance?.approved?.toLocaleString() || 0}`} color="var(--sms-green)" />
          <StatCard icon={<FaHistory />} title="Pending Balance" value={`Rs. ${data?.balance?.pending?.toLocaleString() || 0}`} color="var(--sms-yellow)" />
          <StatCard icon={<FaArrowDown />} title="Total Paid" value={`Rs. ${data?.balance?.paid?.toLocaleString() || 0}`} color="var(--sms-muted)" />
        </div>

        <div className="sms-dashboard-sections">
          <GlassCard>
            <h3>Request Payout</h3>
            <form onSubmit={handleRequest} className="sms-form">
              <div className="sms-form-row">
                <div className="sms-form-group">
                  <label>Amount (Min. 500)</label>
                  <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
                </div>
                <div className="sms-form-group">
                  <label>Method</label>
                  <select value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>
              
              <div className="sms-form-row">
                <input type="text" placeholder="Account Name" value={form.accountName} onChange={e => setForm({...form, accountName: e.target.value})} required />
                <input type="text" placeholder="Account Number" value={form.accountNumber} onChange={e => setForm({...form, accountNumber: e.target.value})} required />
              </div>

              {form.method === 'bank_transfer' && (
                <input type="text" placeholder="Bank Name" value={form.bankName} onChange={e => setForm({...form, bankName: e.target.value})} required />
              )}

              <button className="sms-btn-primary" disabled={submitting || data?.approvedBalance < 500}>
                {submitting ? "Sending..." : "Withdraw Funds"}
              </button>
              {msg && <div className={`sms-alert ${msg.type}`}>{msg.text}</div>}
            </form>
          </GlassCard>

          <GlassCard style={{ marginTop: '2rem' }}>
            <h3>Transaction History</h3>
            <DataTable 
              headers={["Type", "Amount", "Description", "Status", "Date"]}
              rows={data?.transactions}
              renderRow={(tx, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {tx.type === 'credit' ? <FaArrowUp color="var(--sms-green)" /> : <FaArrowDown color="var(--sms-red)" />}
                      {tx.type.toUpperCase()}
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>Rs. {tx.amount?.toLocaleString()}</td>
                  <td>{tx.description}</td>
                  <td><Badge status={tx.status} /></td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              )}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
