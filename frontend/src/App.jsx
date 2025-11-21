import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Theme } from "@radix-ui/themes";
import About from "./pages/About";
import MyApp from "./pages/MyApp";
import Landing from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import Alumni from './pages/Alumni';
import Recruiters from './pages/Recruiters';

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
          {/* <Route path="/play" element={<MyApp />} /> */}
          <Route path="/about" element={<About />} />
           <Route path="/placements/alumni" element={<Alumni />} />
            <Route path="/placements/recruiters" element={<Recruiters />} />
          
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

