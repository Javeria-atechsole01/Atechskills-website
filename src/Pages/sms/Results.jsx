import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { FaChartBar, FaTrophy, FaGraduationCap, FaCertificate } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const Results = () => {
  const { user, token } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/sms/results", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [token]);

  return (
    <div className="sms-dashboard-bg">
      <Sidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Results" />

        <div className="sms-results-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2 className="sms-page-title">Academic Performance</h2>
            <div className="sms-overall-gpa">
              <FaTrophy className="gpa-icon" />
              <div>
                <div className="gpa-label">Current GPA</div>
                <div className="gpa-value">3.85</div>
              </div>
            </div>
          </div>
          
          <div className="sms-results-grid">
            {loading ? <p>Loading results...</p> : results.map(res => (
              <div key={res.id} className="sms-result-card">
                <div className="sms-result-header">
                  <FaGraduationCap className="course-icon" />
                  <div className="course-info">
                    <h4>{res.course}</h4>
                    <p>{res.exam}</p>
                  </div>
                  <div className={`sms-result-status ${res.status.toLowerCase()}`}>{res.status}</div>
                </div>
                
                <div className="sms-result-body">
                  <div className="result-stat">
                    <span className="label">Marks Obtained</span>
                    <span className="value">{res.marks}</span>
                  </div>
                  <div className="result-stat">
                    <span className="label">Letter Grade</span>
                    <span className="value grade">{res.grade}</span>
                  </div>
                </div>

                <div className="sms-result-footer">
                  <button className="sms-btn-certificate"><FaCertificate /> View Certificate</button>
                </div>
              </div>
            ))}
            {!loading && results.length === 0 && <p>No results available yet.</p>}
          </div>

          <div className="sms-performance-summary sms-purple-card" style={{ padding: '2rem', marginTop: '3rem' }}>
            <h3>Performance Summary</h3>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Excellent progress! You are currently in the top 10% of your batch. Keep up the good work to maintain your scholarship eligibility.
            </p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .sms-results-page { padding: 1rem; }
        .sms-page-title { color: #6B21A8; font-size: 1.8rem; font-weight: 700; margin: 0; }
        
        .sms-overall-gpa { background: #fff; padding: 1rem 2rem; border-radius: 1.2rem; border: 1px solid #E2E8F0; display: flex; align-items: center; gap: 1.2rem; box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
        .gpa-icon { font-size: 2.5rem; color: #F59E0B; }
        .gpa-label { font-size: 0.85rem; color: #64748B; text-transform: uppercase; font-weight: 600; }
        .gpa-value { font-size: 1.8rem; font-weight: 800; color: #1E293B; }

        .sms-results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem; }
        .sms-result-card { background: #fff; border-radius: 1.5rem; padding: 2rem; border: 1px solid #E2E8F0; transition: all 0.3s ease; }
        .sms-result-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        
        .sms-result-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; position: relative; }
        .course-icon { font-size: 2.2rem; color: #6B21A8; background: #FAF5FF; padding: 0.6rem; border-radius: 1rem; }
        .course-info h4 { color: #1E293B; font-size: 1.2rem; margin-bottom: 0.2rem; }
        .course-info p { color: #64748B; font-size: 0.9rem; }
        
        .sms-result-status { position: absolute; top: 0; right: 0; padding: 0.4rem 1rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .sms-result-status.passed { background: #ECFDF5; color: #10B981; }
        
        .sms-result-body { display: flex; gap: 3rem; margin-bottom: 2rem; padding: 1.5rem; background: #F8FAFC; border-radius: 1rem; }
        .result-stat { display: flex; flex-direction: column; gap: 0.4rem; }
        .result-stat .label { font-size: 0.8rem; color: #64748B; font-weight: 600; }
        .result-stat .value { font-size: 1.2rem; font-weight: 700; color: #1E293B; }
        .result-stat .value.grade { color: #6B21A8; font-size: 1.5rem; }
        
        .sms-btn-certificate { width: 100%; background: #FAF5FF; color: #6B21A8; border: 1.5px solid #E2E8F0; padding: 0.8rem; border-radius: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: all 0.2s; }
        .sms-btn-certificate:hover { background: #6B21A8; color: #fff; border-color: #6B21A8; }
      ` }} />
    </div>
  );
};

export default Results;
