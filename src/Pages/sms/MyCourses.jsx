import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { FaBookOpen, FaDownload, FaClipboardCheck, FaChartLine } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const MyCourses = () => {
  const { user, token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("enrolled"); // enrolled, completed

  useEffect(() => {
    // In real app, this would be an API call to get student's specific courses
    fetch(`/api/sms/enrollment/my-status`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      // Assuming selectedCourses are returned populated
      setCourses(data.student?.selectedCourses || []);
    });
  }, [token]);

  return (
    <div className="sms-dashboard-bg">
      <Sidebar />
      <main className="sms-dashboard-main">
        <Topbar breadcrumb="My Courses" />

        <div className="sms-courses-page">
          <div className="sms-courses-header">
            <h2 className="sms-courses-title">Learning Journey</h2>
            <div className="sms-courses-tabs">
              <button className={activeTab === 'enrolled' ? 'active' : ''} onClick={() => setActiveTab('enrolled')}>Enrolled Courses</button>
              <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>Completed</button>
            </div>
          </div>

          <div className="sms-courses-grid">
            {courses.length > 0 ? courses.map(course => (
              <div key={course._id} className="sms-my-course-card">
                <div className="sms-my-course-badge">{course.track}</div>
                <h3 className="sms-my-course-name">{course.name}</h3>
                
                <div className="sms-my-course-progress">
                  <div className="sms-progress-info">
                    <span>Course Progress</span>
                    <span>30%</span>
                  </div>
                  <div className="sms-progress-bar">
                    <div className="sms-progress-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="sms-my-course-actions">
                  <button className="sms-btn-learn"><FaBookOpen /> Continue Learning</button>
                  <button className="sms-btn-resources"><FaDownload /> Resources</button>
                </div>
              </div>
            )) : (
              <div className="sms-no-courses">
                <p>You haven't enrolled in any courses yet.</p>
              </div>
            )}
          </div>

          <div className="sms-quick-access">
            <h3 className="sms-quick-title">Quick Access</h3>
            <div className="sms-quick-grid">
              <div className="sms-quick-card">
                <FaClipboardCheck className="icon" />
                <div>
                  <h4>Assignments</h4>
                  <p>Check pending tasks</p>
                </div>
              </div>
              <div className="sms-quick-card">
                <FaChartLine className="icon" />
                <div>
                  <h4>Results</h4>
                  <p>View performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .sms-courses-page { padding: 1rem; }
        .sms-courses-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .sms-courses-title { color: #6B21A8; font-size: 1.8rem; font-weight: 700; }
        .sms-courses-tabs { background: #E2E8F0; padding: 0.3rem; border-radius: 0.8rem; display: flex; gap: 0.3rem; }
        .sms-courses-tabs button { border: none; padding: 0.6rem 1.5rem; border-radius: 0.6rem; font-weight: 600; cursor: pointer; background: transparent; color: #64748B; transition: all 0.2s; }
        .sms-courses-tabs button.active { background: #fff; color: #6B21A8; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        
        .sms-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .sms-my-course-card { background: #fff; border-radius: 1.5rem; padding: 2rem; border: 1px solid #E2E8F0; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
        .sms-my-course-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(107, 33, 168, 0.08); }
        .sms-my-course-badge { color: #6B21A8; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.8rem; }
        .sms-my-course-name { color: #1E293B; font-size: 1.4rem; margin-bottom: 1.5rem; font-weight: 700; }
        
        .sms-my-course-progress { margin-bottom: 2rem; }
        .sms-progress-info { display: flex; justify-content: space-between; font-size: 0.9rem; color: #64748B; margin-bottom: 0.6rem; }
        .sms-progress-bar { height: 8px; background: #F1F5F9; border-radius: 4px; overflow: hidden; }
        .sms-progress-fill { height: 100%; background: linear-gradient(90deg, #6B21A8, #7C3AED); border-radius: 4px; }
        
        .sms-my-course-actions { display: flex; gap: 1rem; }
        .sms-btn-learn { flex: 2; background: #6B21A8; color: #fff; border: none; padding: 0.8rem; border-radius: 0.8rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .sms-btn-resources { flex: 1; background: #FAF5FF; color: #6B21A8; border: 1px solid #E2E8F0; padding: 0.8rem; border-radius: 0.8rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        
        .sms-quick-access { background: #FAF5FF; border-radius: 1.5rem; padding: 2rem; border: 1px dashed #6B21A8; }
        .sms-quick-title { color: #6B21A8; margin-bottom: 1.5rem; }
        .sms-quick-grid { display: flex; gap: 2rem; }
        .sms-quick-card { flex: 1; background: #fff; padding: 1.5rem; border-radius: 1rem; display: flex; align-items: center; gap: 1rem; border: 1px solid #E2E8F0; cursor: pointer; transition: all 0.2s; }
        .sms-quick-card:hover { border-color: #6B21A8; }
        .sms-quick-card .icon { font-size: 2rem; color: #6B21A8; }
        .sms-quick-card h4 { color: #1E293B; margin-bottom: 0.2rem; }
        .sms-quick-card p { color: #64748B; font-size: 0.85rem; }
      ` }} />
    </div>
  );
};

export default MyCourses;
