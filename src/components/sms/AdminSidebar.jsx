import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaTachometerAlt, FaUserCheck, FaUsers, FaFileInvoice, FaBook, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const AdminSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const initials = user?.name?.split(" ").map(n => n[0]).join("") || "A";

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button className="sms-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sms-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sms-sidebar-logo">ATech Skills</div>
        <div className="sms-sidebar-portal" style={{ color: 'var(--sms-red)' }}>Admin Panel</div>
        
        <div className="sms-sidebar-avatar" style={{ background: 'var(--sms-red)', boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)' }}>{initials}</div>
        <div className="sms-sidebar-student">
          <div className="sms-sidebar-student-name">{user?.name || 'Admin'}</div>
          <div className="sms-sidebar-student-course" style={{ color: 'var(--sms-red)' }}>Administrator</div>
        </div>

        <nav className="sms-sidebar-nav">
          <NavLink to="/sms/admin-dashboard" className="sms-sidebar-link" onClick={closeSidebar} end>
            <FaTachometerAlt className="sms-sidebar-link-icon" /> Overview
          </NavLink>
          <NavLink to="/sms/admin/approvals" className="sms-sidebar-link" onClick={closeSidebar}>
            <FaUserCheck className="sms-sidebar-link-icon" /> Pending Approvals
          </NavLink>
          <NavLink to="/sms/admin/students" className="sms-sidebar-link" onClick={closeSidebar}>
            <FaUsers className="sms-sidebar-link-icon" /> All Students
          </NavLink>
          <NavLink to="/sms/admin/fees" className="sms-sidebar-link" onClick={closeSidebar}>
            <FaFileInvoice className="sms-sidebar-link-icon" /> Fee Management
          </NavLink>
          <NavLink to="/sms/admin/courses" className="sms-sidebar-link" onClick={closeSidebar}>
            <FaBook className="sms-sidebar-link-icon" /> Courses & Batches
          </NavLink>

          <div style={{ marginTop: 'auto', padding: '1rem' }}>
            <button className="sms-sidebar-logout-btn" onClick={logout}>
              <FaSignOutAlt className="sms-sidebar-link-icon" /> Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
