import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { ProtectedAdminRoute } from "@/lib/protected-admin-route";
import Navbar from "@/components/layout/navbar";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUserList from "@/pages/admin/user-list";
import AdminUserDetail from "@/pages/admin/user-detail";
import Dashboard from "@/pages/dashboard";
import Contests from "@/pages/contests";
import Courses from "@/pages/courses";
import ContestDetail from "@/pages/contest-detail";
import CourseDetail from "@/pages/course-detail";
import Problems from "@/pages/problems";
import Profile from "@/pages/profile";
import PlatformDetail from "@/pages/platform-detail";
import Leaderboard from "@/pages/leaderboard";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />

      {/* Admin Routes */}
      <ProtectedAdminRoute path="/admin/dashboard" component={AdminDashboard} />
      <ProtectedAdminRoute path="/admin/users" component={AdminUserList} />
      <ProtectedAdminRoute path="/admin/users/:id" component={AdminUserDetail} />

      {/* User Routes */}
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/reminders" component={Contests} />
      <ProtectedRoute path="/contests" component={Contests} />
      <ProtectedRoute path="/courses" component={Courses} />
      <ProtectedRoute path="/contest/:id" component={ContestDetail} />
      <ProtectedRoute path="/course/:id" component={CourseDetail} />
      <ProtectedRoute path="/problems" component={Problems} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/leaderboard" component={Leaderboard} />
      <ProtectedRoute path="/platform/:platform" component={PlatformDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className={`min-h-screen transition-all duration-300 ${isAdminRoute ? '' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
              {!isAdminRoute && <Navbar />}
              <main className="relative">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
