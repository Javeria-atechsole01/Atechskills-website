import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { FaTasks, FaCloudUploadAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const Assignments = () => {
  const { user, token } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Introduction to AI & Automation", course: "Short Bootcamp AI", dueDate: "2024-04-20", status: "pending" },
    { id: 2, title: "React Components & State", course: "Development Track", dueDate: "2024-04-15", status: "submitted" },
    { id: 3, title: "Network Security Basics", course: "Cybersecurity Track", dueDate: "2024-04-10", status: "graded", marks: "90/100" }
  ]);

  return (
    <div className="sms-dashboard-bg">
      <Sidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="Assignments" />

        <div className="sms-assignments-page">
          <h2 className="sms-page-title">My Assignments</h2>
          
          <div className="sms-assignment-list">
            {assignments.map(asm => (
              <div key={asm.id} className="sms-assignment-card">
                <div className="sms-asm-info">
                  <div className="sms-asm-course">{asm.course}</div>
                  <h3 className="sms-asm-title">{asm.title}</h3>
                  <div className="sms-asm-due"><FaClock /> Due: {new Date(asm.dueDate).toLocaleDateString()}</div>
                </div>
                
                <div className="sms-asm-status-area">
                  <div className={`sms-status-tag ${asm.status}`}>
                    {asm.status.toUpperCase()}
                  </div>
                  {asm.marks && <div className="sms-asm-marks">Grade: {asm.marks}</div>}
                </div>

                <div className="sms-asm-actions">
                  {asm.status === 'pending' ? (
                    <button className="sms-btn-upload"><FaCloudUploadAlt /> Submit Now</button>
                  ) : (
                    <button className="sms-btn-view">View Submission</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .sms-assignments-page { padding: 1rem; }
        .sms-page-title { color: #6B21A8; font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; }
        .sms-assignment-card { 
          background: #fff; border-radius: 1.2rem; padding: 1.5rem 2rem; border: 1px solid #E2E8F0;
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem;
          transition: all 0.2s;
        }
        .sms-assignment-card:hover { transform: scale(1.01); border-color: #6B21A8; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        
        .sms-asm-info { flex: 2; }
        .sms-asm-course { color: #6B21A8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem; }
        .sms-asm-title { color: #1E293B; font-size: 1.2rem; margin-bottom: 0.5rem; }
        .sms-asm-due { color: #64748B; font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem; }
        
        .sms-status-tag { padding: 0.4rem 1rem; border-radius: 2rem; font-size: 0.8rem; font-weight: 700; display: inline-block; }
        .sms-status-tag.pending { background: #FEF2F2; color: #EF4444; }
        .sms-status-tag.submitted { background: #EFF6FF; color: #3B82F6; }
        .sms-status-tag.graded { background: #ECFDF5; color: #10B981; }
        
        .sms-asm-marks { margin-top: 0.5rem; font-weight: 700; color: #1E293B; font-size: 0.9rem; }
        
        .sms-btn-upload { background: #6B21A8; color: #fff; border: none; padding: 0.7rem 1.5rem; border-radius: 0.7rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .sms-btn-view { background: #F1F5F9; color: #1E293B; border: none; padding: 0.7rem 1.5rem; border-radius: 0.7rem; font-weight: 600; cursor: pointer; }
      ` }} />
    </div>
  );
};

export default Assignments;
