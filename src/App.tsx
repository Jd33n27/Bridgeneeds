import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/TalentDashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Add your Home/Landing page — use whatever you have
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* Keep /login redirecting to /signin for compatibility */}
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Add the rest as you build */}
      </Routes>
    </Router>
  );
}