import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../../../components/sms/AdminSidebar";
import Topbar from "../../../components/sms/Topbar";
import { AuthContext } from "../../../context/AuthContext";
import { DataTable, Badge, LoadingState, GlassCard } from "../../../components/sms/UI/DashboardUI";
import { FaFileInvoice, FaDownload, FaCheck, FaTrash, FaPlus } from "react-icons/fa";
import "../../../styles/sms-dashboard.css";

const FeeManagement = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [feeRecords, setFeeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ studentId: '', courseId: '', amount: '', dueDate: '', label: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes, feesRes] = await Promise.all([
          fetch("/api/sms/admin/enrolled-students", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/sms/enrollment/courses/all", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/sms/admin/fee-records", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const studentsData = await studentsRes.json();
        const coursesData = await coursesRes.json();
        const feesData = await feesRes.json();

        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setFeeRecords(Array.isArray(feesData) ? feesData : []);
      } catch (err) {
        console.error("Error fetching fee management data:", err);
        setStudents([]);
        setCourses([]);
        setFeeRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleCourseChange = e => {
    const courseId = e.target.value;
    const course = courses.find(c => c._id === courseId);
    setForm({ ...form, courseId, amount: course?.fee || '' });
  };

  if (loading) return <LoadingState />;

  return (
    <div className="sms-dashboard-layout">
      <AdminSidebar />
      <main className="sms-main-content">
        <Topbar title="Financial Management" />
        
        <GlassCard style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus color="var(--sms-primary)" /> Generate New Challan
          </h3>
          <form className="sms-form" style={{ maxWidth: '900px' }}>
            <div className="sms-form-row">
              <div className="sms-form-group">
                <label>Select Student</label>
                <select name="studentId" value={form.studentId} onChange={handleChange}>
                  <option value="">Choose Student</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.studentId})</option>)}
                </select>
              </div>
              <div className="sms-form-group">
                <label>Select Course</label>
                <select name="courseId" value={form.courseId} onChange={handleCourseChange}>
                  <option value="">Choose Course</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            
            <div className="sms-form-row">
              <div className="sms-form-group">
                <label>Amount (PKR)</label>
                <input name="amount" value={form.amount} onChange={handleChange} placeholder="Fee Amount" />
              </div>
              <div className="sms-form-group">
                <label>Due Date</label>
                <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
              </div>
              <div className="sms-form-group">
                <label>Reference Label</label>
                <input name="label" value={form.label} onChange={handleChange} placeholder="e.g. Admission Fee" />
              </div>
            </div>

            <button type="button" className="sms-btn-primary" style={{ width: 'auto', alignSelf: 'flex-start' }}>
              <FaFileInvoice /> Create & Notify
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h3 style={{ marginBottom: '1.5rem' }}>Challan History</h3>
          <DataTable 
            headers={["Challan #", "Student", "Course", "Amount", "Due Date", "Status", "Actions"]}
            rows={feeRecords}
            renderRow={(f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>#{f.challanNo}</td>
                <td>{f.studentId?.name}</td>
                <td>{f.courseId?.name}</td>
                <td style={{ fontWeight: 700 }}>Rs. {f.amount?.toLocaleString()}</td>
                <td>{f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '-'}</td>
                <td><Badge status={f.status} /></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="sms-icon-btn"><FaDownload /></button>
                    <button className="sms-icon-btn success"><FaCheck /></button>
                    <button className="sms-icon-btn danger"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            )}
          />
        </GlassCard>
      </main>
    </div>
  );
};

export default FeeManagement;
