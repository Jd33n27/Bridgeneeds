import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppShell } from "./components/AppShell";

// Main App Pages
import { HomePage } from "./pages/HomePage";
import { ServicesCatalogPage } from "./pages/ServicesCatalogPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { TalentProfilePage } from "./pages/TalentProfilePage";
import { CreateBriefPage } from "./pages/CreateBriefPage";
import { ProjectWorkspacePage } from "./pages/ProjectWorkspacePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { ForTalentPage } from "./pages/ForTalentPage";
import { ForBusinessPage } from "./pages/ForBusinessPage";
import { ClientDashboardPage } from "./pages/ClientDashboardPage";
import { TalentDashboardPage } from "./pages/TalentDashboardPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Auth Pages (Dedicated standalone card layout)
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { OnboardingPage } from "./pages/OnboardingPage";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Main App Routes with Header, Navigation, Footer, Audio Player & Toasts */}
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesCatalogPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/talent/:id" element={<TalentProfilePage />} />
            <Route path="/create-brief" element={<CreateBriefPage />} />
            <Route path="/projects/:id" element={<ProjectWorkspacePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/for-talent" element={<ForTalentPage />} />
            <Route path="/for-business" element={<ForBusinessPage />} />
            
            {/* Dashboards */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/client" replace />} />
            <Route path="/dashboard/client" element={<ClientDashboardPage />} />
            <Route path="/dashboard/talent" element={<TalentDashboardPage />} />

            {/* Legal */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/login" element={<Navigate to="/signin" replace />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}