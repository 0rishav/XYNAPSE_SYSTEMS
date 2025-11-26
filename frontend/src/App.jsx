import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Theme } from "@radix-ui/themes";
import About from "./pages/discover/About";

import Landing from './pages/landing/Landing';
import Gallery from './pages/discover/Gallery';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';
import Layout from './components/Layout';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import Alumni from './pages/placements/Alumni';
import Recruiters from './pages/placements/Recruiters';
import NotFound from './pages/NotFound';
import CourseDetail from './pages/CourseDetail';

function AppShell() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Theme appearance={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/pla" element={<MyApp />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/placements/alumni" element={<Alumni />} />
          <Route path="/placements/recruiters" element={<Recruiters />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Theme>
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

