import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { ProtectedAdminRoute } from "@/lib/protected-admin-route";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUserList from "@/pages/admin/user-list";
import AdminUserDetail from "@/pages/admin/user-detail";
import Dashboard from "@/pages/dashboard";

// Wake up Render backend immediately when app loads (free tier sleeps after 15min)
// NOTE: ServerWakeScreen handles this properly now — this is kept as a fallback
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
import Contests from "@/pages/contests";
import Courses from "@/pages/courses";
import ContestDetail from "@/pages/contest-detail";
import CourseDetail from "@/pages/course-detail";
import LessonDetail from "@/pages/lesson-detail";
import Problems from "@/pages/problems";
import ProblemDetail from "@/pages/problem-detail";
import Profile from "@/pages/profile";
import PlatformDetail from "@/pages/platform-detail";
import Leaderboard from "@/pages/leaderboard";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import ServerWakeScreen from "@/components/layout/server-wake-screen";
import { useState } from "react";
import DsaModulesPage from "@/pages/dsa-modules";
import AdminStudentProgressPage from "@/pages/admin/student-progress";
import AdminStudentProgressDetailPage from "@/pages/admin/student-progress-detail";
import IntegrityDashboard from "@/pages/admin/IntegrityDashboard";
import IntegrityReportDetails from "@/pages/admin/IntegrityReportDetails";
import UserAccessManagement from "@/pages/admin/UserAccessManagement";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch location={location} key={location}>
        <Route path="/auth" component={AuthPage} />

        {/* Admin Routes */}
        <Route path="/admin"><Redirect to="/admin/dashboard" /></Route>
        <ProtectedAdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedAdminRoute path="/admin/users" component={AdminUserList} />
        <ProtectedAdminRoute path="/admin/users/:id" component={AdminUserDetail} />
        <ProtectedAdminRoute path="/admin/access" component={UserAccessManagement} />
        <ProtectedAdminRoute path="/admin/students/progress" component={AdminStudentProgressPage} />
        <ProtectedAdminRoute path="/admin/students/:userId/progress" component={AdminStudentProgressDetailPage} />
        <ProtectedAdminRoute path="/admin/integrity" component={IntegrityDashboard} />
        <ProtectedAdminRoute path="/admin/integrity/reports/:id" component={IntegrityReportDetails} />

        {/* User Routes */}
        <ProtectedRoute path="/" component={Dashboard} />
        <ProtectedRoute path="/dsa/modules" component={DsaModulesPage} />
        <ProtectedRoute path="/dsa/:slug" component={DsaModulesPage} />
        <ProtectedRoute path="/reminders" component={Contests} />
        <ProtectedRoute path="/contests" component={Contests} />
        <ProtectedRoute path="/courses" component={Courses} />
        <ProtectedRoute path="/contest/:id" component={ContestDetail} />
        <ProtectedRoute path="/course/:id" component={CourseDetail} />
        <ProtectedRoute path="/course/:id/lesson/:lessonId" component={LessonDetail} />
        <ProtectedRoute path="/problems" component={Problems} />
        <ProtectedRoute path="/problems/:id" component={ProblemDetail} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/leaderboard" component={Leaderboard} />
        <ProtectedRoute path="/platform/:platform" component={PlatformDetail} />

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <TooltipProvider>
      <div style={{ backgroundColor: '#0f172a', color: 'white' }} className={`min-h-screen transition-all duration-300 ${isAdminRoute ? '' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
        {!isAdminRoute && <Navbar />}
        <main className="relative">
          <Router />
        </main>
      </div>

      <Toaster />
    </TooltipProvider>
  );
}

function App() {
  const [backendReady, setBackendReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* Gate the whole app until backend is confirmed awake (production only) */}
        <ServerWakeScreen onReady={() => setBackendReady(true)} />
        {backendReady && (
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
