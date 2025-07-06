import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import ClubDashboard from "pages/club-dashboard";
import AdminDashboard from "pages/admin-dashboard";
import StudentDashboard from "pages/student-dashboard";
import RealTimeChat from "pages/real-time-chat";
import EventDiscoveryDetails from "pages/event-discovery-details";
import ClubProfileManagement from "pages/club-profile-management";
import NotificationsActivityCenter from "pages/notifications-activity-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/club-dashboard" element={<ClubDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/real-time-chat" element={<RealTimeChat />} />
        <Route path="/event-discovery-details" element={<EventDiscoveryDetails />} />
        <Route path="/club-profile-management" element={<ClubProfileManagement />} />
        <Route path="/club-profile-management/:clubId" element={<ClubProfileManagement />} />
        <Route path="/notifications-activity-center" element={<NotificationsActivityCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;