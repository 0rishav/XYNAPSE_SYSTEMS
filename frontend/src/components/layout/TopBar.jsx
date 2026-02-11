import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Globe3D from "../Globe3D";

// ✅ COMPLETE SOCIAL ICONS WITH PROPER SVGs - FULLY RESPONSIVE
const DEFAULT_SOCIALS = [
  {
    label: "YouTube",
    href: "https://youtube.com/@realxynapse",
    color: "#FF0000",
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/realxynapse",
    color: "#1877F2",
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M22.154 12.137c0-6.756-5.492-12.249-12.249-12.249-6.757 0-12.25 5.493-12.25 12.249 0 6.211 4.547 11.369 10.457 12.31v-8.66h-3.153v-3.562h3.153v-2.7c0-3.135 1.916-4.846 4.712-4.846 1.392 0 2.907.247 2.907.247v3.184h-1.637c-1.616 0-2.122 1.004-2.122 2.033v2.45h3.626l-.585 3.562h-3.041v8.66c5.91-.941 10.457-4.099 10.457-12.31z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/realxynapse",
    color: "#E4405F",
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12.017 2C6.486 2 2.004 6.481 2.004 12.012c0 5.53 4.482 10.012 10.013 10.012s10.013-4.482 10.013-10.012C22.03 6.481 17.549 2 12.018 2h-.001zm0 18c-4.637 0-8.42-3.782-8.42-8.987s3.783-8.988 8.42-8.988 8.42 3.783 8.42 8.988c0 5.204-3.783 8.986-8.42 8.986zm0-14.987a6.52 6.52 0 0 0-6.52 6.52 6.52 6.52 0 0 0 6.52 6.52 6.52 6.52 0 0 0 6.52-6.52 6.52 6.52 0 0 0-6.52-6.52zm9.043 9.487c0 2.21-.423 3.203-1.778 4.057a4.004 4.004 0 0 1-2.625 1.04c-.997.107-1.61-.479-3.633-.479s-2.636.586-3.633.479a4.004 4.004 0 0 1-2.625-1.04c-1.355-.854-1.778-1.847-1.778-4.057s.423-3.203 1.778-4.057a4.004 4.004 0 0 1 2.625-1.04c.997-.107 1.61.479 3.633.479s2.636-.586 3.633-.479a4.004 4.004 0 0 1 2.625 1.04c1.355.854 1.778 1.847 1.778 4.057zm-9.043-7.507a3.008 3.008 0 1 1 0 6.016 3.008 3.008 0 0 1 0-6.016zm9.032 10.505a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/realxynapse",
    color: "#0A66C2",
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M20.447 20.452H16.893V14.475c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-4.123 0 2.062 2.062 0 0 1 4.123 0zM3.599 20.452H7.561V9H3.6a2.06 2.06 0 0 1 0-4.122 2.06 2.06 0 0 1 2.062 2.06v11.494z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/realxynapse",
    color: "#1DA1F2",
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function TopBar({
  openModal,
  isAuthenticated,
  goToProfile,
  socials = DEFAULT_SOCIALS,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <>
      <div className="border-b border-slate-200/70 bg-slate-50 text-[13px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-2 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo + Brand Text - Always visible */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center perspective flex-shrink-0">
              <Globe3D />
            </div>
            <div className="brand-text mt-1 sm:mt-2 hidden sm:block text-[10px] sm:text-xs md:text-sm leading-tight tracking-tighter">
              <span>X</span>
              <span>Y</span>
              <span>N</span>
              <span>A</span>
              <span>P</span>
              <span>S</span>
              <span>E</span>
              <span className="gap"></span>
              <span>S</span>
              <span>Y</span>
              <span>S</span>
              <span>T</span>
              <span>E</span>
              <span>M</span>
              <span>S</span>
            </div>
          </div>

          {/* Center: Contact info - Responsive stacking */}
          <div className="hidden sm:flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-slate-600 dark:text-slate-200">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
              📞 1800-120-4748
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
              📱 Download Mobile App
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
              ➕ Blogs
            </span>
          </div>

          {/* Right: Smart Responsive Buttons - NO SCROLLING */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 flex-nowrap min-w-0">
            {/* Job Mela - Hide on very small tablets */}
            <Link
              to="/job-mela"
              className="hidden sm:inline-flex lg:flex items-center gap-1 rounded-full bg-rose-600 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-rose-600/30 hover:shadow-lg transition-all whitespace-nowrap flex-shrink-0 login-btn"
            >
              Job Mela
            </Link>

            {/* Enroll - Priority 1, always visible */}
            <button
              onClick={() => openModal("enroll", { name: "Online Enrollment" })}
              className="sm:inline-flex items-center gap-1 rounded-full bg-sky-600 px-2 sm:px-2.5 md:px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-white hover:bg-sky-500 enroll-cta transition-all whitespace-nowrap flex-shrink-0 login-btn"
            >
              Enroll
            </button>

            {/* Internship - Hide on small tablets */}
            <button
              onClick={() =>
                openModal("internship", { name: "Internship Application" })
              }
              className="hidden sm:inline-flex md:flex items-center gap-1 text-white rounded-full border border-slate-300 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 dark:hover:text-slate-800 shimmer-btn transition-all whitespace-nowrap flex-shrink-0 login-btn"
            >
              Internship
            </button>

            {/* Resources - Hide first on tablets */}
            <div className="relative hidden lg:inline-block xl:inline-flex group flex-shrink-0">
              <button className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 dark:hover:text-slate-800 transition-all whitespace-nowrap">
                Resources
                <svg
                  className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-white/20 dark:bg-slate-900">
                <a
                  href="https://youtube.com/@realxynapse?si=7PS2DXi8SZKJ_3Tb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-t-xl px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  🎥 Video Lectures
                </a>
                <Link
                  to="/resources/interview-questions"
                  className="block w-full rounded-b-xl px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  📄 Interview Questions
                </Link>
              </div>
            </div>

            {/* Login/Profile - Priority 2 */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="sm:inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-white border border-indigo-300/40 dark:border-indigo-500/30 overflow-hidden hover:shadow-md transition-all whitespace-nowrap flex-shrink-0 login-btn"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={goToProfile}
                className="hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-300 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 transition-all whitespace-nowrap flex-shrink-0"
              >
                Profile
              </button>
            )}

            {/* Social Icons - Show 3 on XL+, all 5 in sidebar */}
            <div className="hidden xl:flex xl:items-center gap-1 xl:gap-2 flex-shrink-0">
              {socials.slice(0, 3).map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-900 hover:shadow-lg hover:scale-110 transition-all duration-300 flex-shrink-0"
                  style={{
                    borderColor: item.color,
                    color: item.color,
                    animation: `socialFloat 4.5s ease-in-out ${index * 0.6}s infinite`,
                  }}
                >
                  <span className="relative z-10">{item.icon}</span>
                  <div
                    className="absolute inset-0 rounded-full opacity-20 blur-sm"
                    style={{ backgroundColor: item.color }}
                  />
                </a>
              ))}
            </div>

            {/* Hamburger - Always last, larger touch target */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden ml-1 sm:ml-2 p-2.5 text-xl flex-shrink-0 hover:bg-slate-200 rounded-full transition-all duration-200"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Full height, perfect touch targets */}
      <div
        className={`fixed inset-0 z-50 ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-300 md:hidden`}
      >
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 p-6 transition-transform duration-300 shadow-2xl flex flex-col ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6 pt-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-3xl font-bold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-all p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 text-base flex-1 overflow-y-auto pb-8">
            {/* Contact Info */}
            <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-200 pb-6 border-b border-slate-200 dark:border-slate-700">
              <span className="flex items-center gap-3 text-lg">
                📞 1800-120-4748
              </span>
              <span className="flex items-center gap-3 text-lg">
                📱 Download Mobile App
              </span>
              <span className="flex items-center gap-3 text-lg">➕ Blogs</span>
            </div>

            {/* ALL Action Buttons - Full width, large touch targets */}
            <div className="flex flex-col gap-4">
              <Link
                to="/job-mela"
                className="group rounded-2xl bg-rose-600 px-6 py-4 text-white text-left font-bold shadow-xl hover:bg-rose-500 hover:shadow-2xl transition-all duration-200 flex items-center gap-3 login-btn"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-2xl">🎯</span>
                Job Mela
              </Link>

              <button
                onClick={() => {
                  openModal("enroll", { name: "Online Enrollment" });
                  setSidebarOpen(false);
                }}
                className="group rounded-2xl bg-sky-600 px-6 py-4 text-white text-left font-bold shadow-xl hover:bg-sky-500 hover:shadow-2xl transition-all duration-200 flex items-center gap-3 enroll-cta login-btn"
              >
                <span className="text-2xl">🚀</span>
                Enroll Now
              </button>

              <button
                onClick={() => {
                  openModal("internship", { name: "Internship Application" });
                  setSidebarOpen(false);
                }}
                className="group rounded-2xl border-2 border-slate-300 px-6 py-4 text-left font-bold hover:bg-slate-50 hover:shadow-xl dark:border-white/30 dark:hover:bg-slate-800 transition-all duration-200 flex items-center gap-3 shimmer-btn"
              >
                <span className="text-2xl">💼</span>
                Internship
              </button>

              {/* Resources Accordion */}
              <div className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full group rounded-2xl border-2 border-slate-300 px-6 py-4 text-left font-bold flex justify-between items-center hover:bg-slate-50 hover:shadow-xl dark:border-white/30 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    Resources
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-200 ease-in-out ${
                      resourcesOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {resourcesOpen && (
                  <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-lg dark:border-white/20 dark:bg-slate-800/50">
                    <a
                      href="https://youtube.com/@realxynapse?si=7PS2DXi8SZKJ_3Tb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl px-5 py-4 font-semibold text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-x-1 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <span className="text-2xl flex-shrink-0">🎥</span>
                      <span>Video Lectures</span>
                    </a>
                    <Link
                      to="/resources/interview-questions"
                      className="group flex items-center gap-4 rounded-xl px-5 py-4 font-semibold text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-x-1 dark:text-slate-200 dark:hover:bg-slate-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-2xl flex-shrink-0">📄</span>
                      <span>Interview Questions</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Login/Profile */}
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="group rounded-2xl border-2 border-slate-300 px-6 py-4 text-left font-bold hover:bg-slate-50 hover:shadow-xl dark:border-white/30 dark:hover:bg-slate-800 transition-all duration-200 flex items-center gap-3 login-btn"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-2xl">👤</span>
                  Student Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    goToProfile();
                    setSidebarOpen(false);
                  }}
                  className="group rounded-2xl border-2 border-slate-300 px-6 py-4 text-left font-bold hover:bg-slate-50 hover:shadow-xl dark:border-white/30 dark:hover:bg-slate-800 transition-all duration-200 flex items-center gap-3 login-btn"
                >
                  <span className="text-2xl">👤</span>
                  My Profile
                </button>
              )}
            </div>

            {/* Social Icons Bottom - ALL 5 icons */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-700 mt-auto">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative p-3 sm:p-4 rounded-2xl border-2 bg-white dark:bg-slate-800 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-14 h-14 sm:w-16 sm:h-16"
                  title={item.label}
                  style={{
                    borderColor: item.color,
                    color: item.color,
                  }}
                >
                  <span className="relative z-10 text-lg sm:text-xl">
                    {item.icon}
                  </span>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20 blur-sm -z-10"
                    style={{ backgroundColor: item.color }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes socialFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        @keyframes enrollPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
          }
        }
        .enroll-cta {
          animation: enrollPulse 2s ease-in-out infinite;
        }
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
        }
        .shimmer-btn:hover::before {
          left: 100%;
        }
        .login-btn {
          transition: all 0.2s ease-in-out;
        }
        .login-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
