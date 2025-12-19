import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import About from "./pages/discover/About";

import Landing from "./pages/landing/Landing";
import Gallery from "./pages/discover/Gallery";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/auth/Profile";
import Layout from "./components/Layout";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./App.css";
import Alumni from "./pages/placements/Alumni";
import Recruiters from "./pages/placements/Recruiters";
import NotFound from "./pages/NotFound";
import CourseDetail from "./pages/CourseDetail";
import AdminLayout from "./components/layout/AdminLayout";
import InternshipPage from "./admin/internship/InternshipPage";
import { CourseAdminPage, CourseFormAdminPage } from "./admin/course";
import { InterviewQuestionPage } from "./admin/interview";
import { InvoicePage } from "./admin/Invoices";
import { SalarySlipPage } from "./admin/SalarySlip";
import { EmployeeApplicationPage } from "./admin/EmployeeApplication";
import { JobMelaPage } from "./admin/JobMela";
import { Toaster } from "react-hot-toast";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import InterviewQuestion from "./pages/Interview-Question/InterviewQuestion";
import InterviewQuestionDetailPage from "./pages/Interview-Question/InterviewQuestionDetailPage";
import Dashboard from "./pages/dashboard/Dashboard";
import MyInvoices from "./pages/dashboard/MyInvoices";
import MyInternshipPage from "./pages/dashboard/MyInternshipPage";
import JobMela from "./pages/JobMela";
import Users from "./admin/users/Users";
import AllCoursesPage from "./pages/AllCoursesPage";
import CollegePartner from "./pages/colleges/CollegePartner";
import ClassroomTraining from "./pages/colleges/ClassroomTraining";
import CollegeConnect from "./pages/colleges/CollegeConnect";
import College from "./admin/college/College";

function AppShell() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Theme appearance={theme}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: "14px",
              borderRadius: "8px",
            },
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/placements/alumni" element={<Alumni />} />
            <Route path="/placements/recruiters" element={<Recruiters />} />
            <Route
              path="/resources/interview-questions"
              element={<InterviewQuestion />}
            />
            <Route
              path="/interview-questions/:name"
              element={<InterviewQuestionDetailPage />}
            />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/my-invoices" element={<MyInvoices />} />
            <Route
              path="/dashboard/my-internships"
              element={<MyInternshipPage />}
            />
            <Route path="/job-mela" element={<JobMela />} />
            <Route path="/courses" element={<AllCoursesPage />} />
            <Route path="/college/partners" element={<CollegePartner />} />
            <Route path="/college/training" element={<ClassroomTraining />} />
            <Route path="/college/connect" element={<CollegeConnect />} />
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<InternshipPage />} />
              <Route path="internship" element={<InternshipPage />} />
              <Route path="college" element={<College />} />
              <Route path="users" element={<Users />} />
              <Route path="courses" element={<CourseAdminPage />} />
              <Route path="course-forms" element={<CourseFormAdminPage />} />
              <Route path="interview" element={<InterviewQuestionPage />} />
              <Route path="invoices" element={<InvoicePage />} />
              <Route path="salary-slips" element={<SalarySlipPage />} />
              <Route
                path="employee-applications"
                element={<EmployeeApplicationPage />}
              />
              <Route path="job-postings" element={<JobMelaPage />} />
            </Route>
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Theme>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
