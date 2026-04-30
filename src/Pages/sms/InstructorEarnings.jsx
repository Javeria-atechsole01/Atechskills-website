import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { Badge, LoadingState, DataTable, GlassCard } from "../../components/sms/UI/DashboardUI";
import { FaArrowUp, FaArrowDown, FaChartBar } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const InstructorEarnings = () => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEarnings(); }, []);

  const fetchEarnings = async () => {
    try {
      const res = await fetch("/api/sms/instructor/earnings", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      setTransactions(await res.json());
    } finally { setLoading(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <Topbar title="Revenue History" />
        
        <GlassCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3>Instructor Payouts & Revenue</h3>
            <FaChartBar color="var(--sms-primary)" />
          </div>
          
          <DataTable 
            headers={["Type", "Amount", "Description", "Status", "Date"]}
            rows={transactions}
            renderRow={(tx, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    {tx.type === 'credit' ? <FaArrowUp color="var(--sms-green)" /> : <FaArrowDown color="var(--sms-red)" />}
                    <span style={{ color: tx.type === 'credit' ? 'var(--sms-green)' : 'var(--sms-red)' }}>
                      {tx.type.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>Rs. {tx.amount?.toLocaleString()}</td>
                <td style={{ fontSize: '0.9rem', color: 'var(--sms-muted)' }}>{tx.description}</td>
                <td><Badge status={tx.status} /></td>
                <td style={{ fontSize: '0.85rem' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
              </tr>
            )}
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default InstructorEarnings;
