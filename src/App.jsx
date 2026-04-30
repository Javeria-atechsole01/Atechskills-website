import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './Component/Navbar.jsx'
import Home from './Pages/Home.jsx'
import ToolsPage from './Pages/ToolsPage.jsx'
import Success from './Pages/Success.jsx'
import Blog from './Pages/Blog.jsx'
import Contact from './Pages/Contact.jsx'
import AI from './Pages/AI.jsx'
import Cybersecurity from './Pages/Cybersecurity.jsx'
import Development from './Pages/Development.jsx'
import Enroll from './Pages/Enroll.jsx'
import Courses from './Pages/Courses.jsx'
import Team from './Pages/Team.jsx'
import Admin from './Pages/Admin.jsx'
import QES from './Pages/QES.jsx'
import Automation from './Pages/Automation.jsx'
import Index from './Index.jsx'
import ShortCourses from './Pages/ShortCourses.jsx'
import LoginPage from "./Pages/sms/LoginPage";
import SignupPage from "./Pages/sms/SignupPage";
import CourseSelection from "./Pages/sms/CourseSelection";
import MyCourses from "./Pages/sms/MyCourses";
import FeeChallan from "./Pages/sms/FeeChallan";
import Assignments from "./Pages/sms/Assignments";
import Results from "./Pages/sms/Results";
import StudentDashboard from "./Pages/sms/StudentDashboard";
import AdminDashboard from "./Pages/sms/AdminDashboard";
import EnrollmentStatus from "./Pages/sms/EnrollmentStatus";
import AffiliateDashboard from "./Pages/sms/AffiliateDashboard";
import WalletPage from "./Pages/sms/WalletPage";
import PendingApprovals from "./Pages/sms/admin/PendingApprovals";
import AllStudents from "./Pages/sms/admin/AllStudents";
import FeeManagement from "./Pages/sms/admin/FeeManagement";
import CoursesAndBatches from "./Pages/sms/admin/CoursesAndBatches";
import ProtectedRoute from "./components/sms/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { Routes, Route, } from "react-router-dom";

function App() {

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Index />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ToolsPage" element={<ToolsPage />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AI" element={<AI />} />
          <Route path="/Cybersecurity" element={<Cybersecurity />} />
          <Route path="/Development" element={<Development />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Enroll" element={<Enroll />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/QES" element={<QES />} />
          <Route path="/Automation" element={<Automation />} />
          <Route path="/ShortCourses" element={<ShortCourses />} />
          
          {/* SMS Routes */}
          <Route path="/sms/login" element={<LoginPage />} />
          <Route path="/sms/signup" element={<SignupPage />} />
          
          {/* Student Routes */}
          <Route path="/sms/select-courses" element={<ProtectedRoute role="student"><CourseSelection /></ProtectedRoute>} />
          <Route path="/sms/my-courses" element={<ProtectedRoute role="student"><MyCourses /></ProtectedRoute>} />
          <Route path="/sms/fee-challan" element={<ProtectedRoute role="student"><FeeChallan /></ProtectedRoute>} />
          <Route path="/sms/assignments" element={<ProtectedRoute role="student"><Assignments /></ProtectedRoute>} />
          <Route path="/sms/results" element={<ProtectedRoute role="student"><Results /></ProtectedRoute>} />
          <Route path="/sms/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/sms/enrollment-status" element={<ProtectedRoute role="student"><EnrollmentStatus /></ProtectedRoute>} />
          
          {/* Affiliate/Wallet Routes */}
          <Route path="/sms/affiliate" element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>} />
          <Route path="/sms/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/sms/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/sms/admin/approvals" element={<ProtectedRoute role="admin"><PendingApprovals /></ProtectedRoute>} />
          <Route path="/sms/admin/students" element={<ProtectedRoute role="admin"><AllStudents /></ProtectedRoute>} />
          <Route path="/sms/admin/fees" element={<ProtectedRoute role="admin"><FeeManagement /></ProtectedRoute>} />
          <Route path="/sms/admin/courses" element={<ProtectedRoute role="admin"><CoursesAndBatches /></ProtectedRoute>} />
        </Routes>
        <a
          href="https://wa.me/923253344552"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="WhatsApp Chat"
        >
          <FaWhatsapp size={26} />
        </a>
      </div>
    </AuthProvider>
  );
}

export default App
