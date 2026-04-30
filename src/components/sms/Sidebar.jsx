import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { 
  FaTachometerAlt, FaBook, FaFileInvoice, FaTasks, FaChartBar, 
  FaUser, FaSignOutAlt, FaHandshake, FaWallet, FaBars, FaTimes 
} from "react-icons/fa";
import "../../styles/sms-dashboard.css";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const initials = user?.name?.split(" ").map(n => n[0]).join("") || "U";

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button className="sms-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sms-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sms-sidebar-logo">ATech Skills</div>
        <div className="sms-sidebar-portal">
          {user?.role === "admin" ? "Admin Portal" : 
           user?.role === "instructor" ? "Instructor Portal" : "Student Portal"}
        </div>
        
        <div className="sms-sidebar-avatar">{initials}</div>
        <div className="sms-sidebar-student">
          <div className="sms-sidebar-student-name">{user?.name}</div>
          <div className="sms-sidebar-student-course">{user?.role?.toUpperCase()}</div>
        </div>

        <nav className="sms-sidebar-nav">
          {/* Universal Links */}
          {user?.role === "student" && (
            <>
              <NavLink to="/sms/student-dashboard" className="sms-sidebar-link" onClick={closeSidebar} end>
                <FaTachometerAlt className="sms-sidebar-link-icon" /> Dashboard
              </NavLink>
              <NavLink to="/sms/my-courses" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaBook className="sms-sidebar-link-icon" /> My Courses
              </NavLink>
            </>
          )}

          {/* Instructor Specific Links */}
          {user?.role === "instructor" && (
            <>
              <NavLink to="/sms/instructor/dashboard" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaTachometerAlt className="sms-sidebar-link-icon" /> Ins. Dashboard
              </NavLink>
              <NavLink to="/sms/instructor/courses" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaBook className="sms-sidebar-link-icon" /> My Courses
              </NavLink>
              <NavLink to="/sms/instructor/earnings" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaWallet className="sms-sidebar-link-icon" /> Earnings
              </NavLink>
            </>
          )}

          {/* Affiliate & Wallet */}
          {(user?.role === "student" || user?.role === "instructor") && (
            <>
              <div className="sms-sidebar-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem' }}></div>
              <NavLink to="/sms/affiliate" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaHandshake className="sms-sidebar-link-icon" /> Affiliate
              </NavLink>
              <NavLink to="/sms/wallet" className="sms-sidebar-link" onClick={closeSidebar}>
                <FaWallet className="sms-sidebar-link-icon" /> Wallet
              </NavLink>
            </>
          )}

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

export default Sidebar;
