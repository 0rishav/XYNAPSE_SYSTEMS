import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function TopBar({
  openModal,
  isAuthenticated,
  goToProfile,
  socials = [],
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <>
      <div className="border-b border-slate-200/70 bg-slate-50 text-[13px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex max-w-7xl g px-4 py-3 flex-row items-center justify-between sm:px-6 lg:px-8">
          <div className="hidden md:flex md:flex-wrap md:items-center gap-4 text-slate-600 dark:text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              📞 1800-120-4748
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              📱 Download Mobile App
            </span>
            <span className="hidden items-center gap-1.5 md:inline-flex">
              ➕ Blogs
            </span>
          </div>

          <div className="flex justify-start md:justify-center">
            <Link
              to="/job-mela"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-rose-600/30"
            >
              Job Mela
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-100">
            <button
              onClick={() => openModal("enroll", { name: "Online Enrollment" })}
              className="hidden md:inline-flex items-center gap-1 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 enroll-cta"
            >
              Enroll
            </button>

            <button
              onClick={() =>
                openModal("internship", { name: "Internship Application" })
              }
              className="hidden md:inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 dark:hover:text-slate-800 shimmer-btn"
            >
              Internship
            </button>

            <div className="relative hidden md:inline-block group">
              <button className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 dark:hover:text-slate-800">
                Resources
                <svg
                  className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
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
                  className="block w-full rounded-t-xl px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  🎥 Video Lectures
                </a>

                <Link
                  to="/resources/interview-questions"
                  className="block w-full rounded-b-xl px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  📄 Interview Questions
                </Link>
              </div>
            </div>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="login-btn relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-slate-700 dark:text-white border border-indigo-300/40 dark:border-indigo-500/30 overflow-hidden"
              >
                Student Login
              </Link>
            ) : (
              <button
                onClick={goToProfile}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold dark:border-white/30"
              >
                My Profile
              </button>
            )}

            <div className="hidden lg:flex lg:items-center gap-2">
              {socials.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon group relative inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:bg-slate-900 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                  style={{
                    borderColor: item.color,
                    animationDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-sm group-hover:rotate-12"
                    viewBox="0 0 24 24"
                    fill={item.color}
                  >
                    <path d={item.iconPath} />
                  </svg>
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                    style={{ backgroundColor: item.color }}
                  />
                </a>
              ))}
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden ml-auto text-xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-slate-900 p-5 transition-transform duration-300 shadow-2xl flex flex-col justify-between ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4 text-sm flex-1 mt-2">
            <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-200">
              <span className="flex items-center gap-2">📞 1800-120-4748</span>
              <span className="flex items-center gap-2">
                📱 Download Mobile App
              </span>
              <span className="flex items-center gap-2">➕ Blogs</span>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <button
                onClick={() =>
                  openModal("enroll", { name: "Online Enrollment" })
                }
                className="rounded-lg bg-sky-600 px-4 py-2 text-white text-left font-medium shadow hover:bg-sky-500 transition-colors"
              >
                Enroll
              </button>

              <button
                onClick={() =>
                  openModal("internship", { name: "Internship Application" })
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-left font-medium hover:bg-slate-100 dark:border-white/30 dark:hover:bg-slate-800 transition-colors"
              >
                Internship
              </button>

              <div className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-left font-medium flex justify-between items-center hover:bg-slate-100 dark:border-white/30 dark:hover:bg-slate-800 transition-colors"
                >
                  Resources
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                      resourcesOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {resourcesOpen && (
                  <div className="mt-1 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-md dark:border-white/20 dark:bg-slate-900">
                    {/* Video Lectures */}
                    <a
                      href="https://youtube.com/@realxynapse?si=7PS2DXi8SZKJ_3Tb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      🎥 Video Lectures
                    </a>

                    <Link
                      to="/resources/interview-questions"
                      className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      📄 Interview Questions
                    </Link>
                  </div>
                )}
              </div>

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-left font-medium hover:bg-slate-100 dark:border-white/30 dark:hover:bg-slate-800 transition-colors"
                >
                  Student Login
                </Link>
              ) : (
                <button
                  onClick={goToProfile}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-left font-medium hover:bg-slate-100 dark:border-white/30 dark:hover:bg-slate-800 transition-colors"
                >
                  My Profile
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-gray-300 dark:border-white/30 bg-white dark:bg-slate-800 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-transform"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={item.color}
                    className="h-5 w-5"
                  >
                    <path d={item.iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes socialPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes socialFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0); }
        }
        .social-icon {
          animation: socialPulse 3s infinite, socialFloat 4s infinite ease-in-out;
        }
        @keyframes enrollPulse {
          0% { box-shadow: 0 0 0 0 rgba(14,165,233,0.18); }
          40% { box-shadow: 0 12px 30px rgba(14,165,233,0.06); }
          100% { box-shadow: 0 0 0 0 rgba(14,165,233,0); }
        }
        .enroll-cta {
          animation: enrollPulse 4.5s ease-in-out infinite;
        }
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::before {
          content: "";
          position: absolute;
          left: -120%;
          top: 0;
          height: 100%;
          width: 120%;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.14) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: skewX(-18deg);
        }
        .shimmer-btn:hover::before {
          animation: shimmer 1.1s linear forwards;
        }
        @keyframes shimmer {
          to { left: 120%; }
        }
      `}</style>
    </>
  );
}
