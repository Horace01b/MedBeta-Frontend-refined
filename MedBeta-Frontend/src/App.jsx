import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";

function App() {
  const [user, setUser] = useState(null); // Mock user state
  
  // Mock login function for demo
  const login = (userType) => {
    setUser({ role: userType });
  };
  
  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
    return children;
  };
  
  // Dashboard redirect based on role
  const DashboardRedirect = () => {
    if (!user) return <Navigate to="/" />;
    
    switch (user.role) {
      case 'doctor':
        return <Navigate to="/doctor-dashboard" />;
      case 'patient':
        return <Navigate to="/patient-dashboard" />;
      case 'superadmin':
        return <Navigate to="/superadmin-dashboard" />;
      case 'pharmacist':
        return <Navigate to="/pharmacist-dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage onLogin={login} />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          <Route 
            path="/doctor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patient-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/superadmin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/pharmacist-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <PharmacistDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
