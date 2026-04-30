import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sms/Sidebar";
import Topbar from "../../components/sms/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { StatCard, Badge, LoadingState, DataTable, GlassCard } from "../../components/sms/UI/DashboardUI";
import { FaPlus, FaEdit, FaEye, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const InstructorCourses = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", bootcampType: "complete", track: "", duration: "", fee: 0 });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/sms/instructor/courses", {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` }
      });
      setCourses(await res.json());
    } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sms/instructor/course", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newCourse)
      });
      if (res.ok) { setShowModal(false); fetchCourses(); }
    } catch (err) { console.error(err); }
  };

  if (loading) return <LoadingState message="Syncing courses..." />;

  return (
    <div className="sms-dashboard-layout">
      <Sidebar />
      <div className="sms-main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 className="sms-page-title">Course Management</h2>
          <button className="sms-btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> New Course
          </button>
        </div>

        <DataTable 
          headers={["Course", "Track", "Students", "Revenue", "Status", "Actions"]}
          rows={courses}
          renderRow={(course, i) => (
            <tr key={i}>
              <td>
                <div style={{ fontWeight: 600 }}>{course.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--sms-muted)' }}>{course.bootcampType.toUpperCase()}</div>
              </td>
              <td>{course.track}</td>
              <td><FaUsers /> {course.studentCount || 0}</td>
              <td style={{ color: 'var(--sms-green)', fontWeight: 700 }}>Rs. {course.totalRevenue?.toLocaleString()}</td>
              <td><Badge status={course.status} /></td>
              <td>
                <button className="sms-icon-btn"><FaEdit /></button>
                <button className="sms-icon-btn"><FaEye /></button>
              </td>
            </tr>
          )}
        />
      </div>

      {showModal && (
        <div className="sms-modal-overlay">
          <GlassCard className="sms-modal">
            <h3>Launch New Course</h3>
            <form onSubmit={handleCreate} className="sms-form">
              <div className="sms-form-group">
                <label>Title</label>
                <input type="text" onChange={e => setNewCourse({...newCourse, name: e.target.value})} required />
              </div>
              <div className="sms-form-row">
                <select onChange={e => setNewCourse({...newCourse, bootcampType: e.target.value})}>
                  <option value="complete">Complete Bootcamp</option>
                  <option value="short">Short Bootcamp</option>
                </select>
                <input type="text" placeholder="Track (e.g. AI)" onChange={e => setNewCourse({...newCourse, track: e.target.value})} required />
              </div>
              <div className="sms-form-row">
                <input type="text" placeholder="Duration" onChange={e => setNewCourse({...newCourse, duration: e.target.value})} required />
                <input type="number" placeholder="Fee (PKR)" onChange={e => setNewCourse({...newCourse, fee: Number(e.target.value)})} required />
              </div>
              <div className="sms-modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="sms-btn-secondary">Cancel</button>
                <button type="submit" className="sms-btn-primary">Create Course</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
