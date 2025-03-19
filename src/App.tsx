import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CompanyServices from './pages/company/CompanyServices';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/auth/LoginPage';
import Layout from "./components/Layout";
import ProtectedRoute from './components/common/ProtectedRoute';
import UserDashboard from './components/dashboard/UserDashboard';
import VideoClassroom from './components/dashboard/VideoClassroom';
import CourseContent from './components/courses/CourseContent';
import SignUp from './pages/auth/SignupPage';  // Updated to use SignupPage instead of SignUp
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Student Routes */}
                <Route path="/courses" element={
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <CourseListingPage />
                  </ProtectedRoute>
                } />
                <Route path="/courses/:id" element={
                  <ProtectedRoute allowedRoles={['student', 'admin']}>
                    <CourseDetailsPage />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                {/* User Dashboard - All Authenticated Users */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
            <Footer />
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
