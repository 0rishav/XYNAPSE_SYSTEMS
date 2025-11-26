import React from "react";
import { Link } from "react-router-dom";

export default function TopBar({
  openModal,
  isAuthenticated,
  goToProfile,
  // userLabel,
  socials = [],
}) {
  return (
    <div className="border-b border-slate-200/70 bg-slate-50 text-[13px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-7xl  g px-4 py-3 flex-row items-center justify-between sm:px-6 lg:px-8">
        <div className="hidden md:flex md:flex-wrap md:items-center gap-4 text-slate-600 dark:text-slate-200">
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-3.482a1.5 1.5 0 00-1.211-1.473l-2.8-.56a1.5 1.5 0 00-1.513.624l-.97 1.293c-2.682-1.2-4.863-3.38-6.063-6.063l1.293-.97a1.5 1.5 0 00.624-1.513l-.56-2.8A1.5 1.5 0 008.482 3h-3.482a1.5 1.5 0 00-1.5 1.5v2.25z"
              />
            </svg>
            1800-120-4748
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 2.25h6a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 19.5v-15A2.25 2.25 0 019 2.25z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 18.75h6"
              />
            </svg>
            Download Mobile App
          </span>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75v10.5m-4.5-5.25h9m3.75 1.5V7.125a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25v9.75a2.25 2.25 0 002.25 2.25h7.125"
              />
            </svg>
            Blogs
          </span>
        </div>

        <div className="flex justify-start md:justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-rose-600/30"
          >
            Job Mela
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-100">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide dark:border-white/30"
          >
            Career Guidance
          </button>
          <button
            type="button"
            onClick={() => openModal("enroll", null)}
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 enroll-cta"
          >
            Enroll
          </button>
          <button
            type="button"
            onClick={() => openModal("internship", null)}
            className="hidden md:inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-300 dark:hover:text-slate-800 shimmer-btn"
          >
            Internship
          </button>
          {!isAuthenticated ? (
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Link
                to="/login"
                className="login-btn relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 
               bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
               text-slate-700 dark:text-white border border-indigo-300/40 
               dark:border-indigo-500/30 overflow-hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
                Student Login
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={goToProfile}
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold dark:border-white/30"
            >
              Dashboard
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
                  className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-sm"
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

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Enroll button subtle pulse + lift */
            @keyframes enrollPulse {
              0% { box-shadow: 0 0 0 0 rgba(14,165,233,0.18); transform: translateY(0); }
              40% { box-shadow: 0 12px 30px rgba(14,165,233,0.06); transform: translateY(-2px); }
              100% { box-shadow: 0 0 0 0 rgba(14,165,233,0); transform: translateY(0); }
            }

            .enroll-cta {
              animation: enrollPulse 4.5s ease-in-out infinite;
              transition: transform 180ms ease, box-shadow 180ms ease;
            }
            .enroll-cta:hover {
              animation-play-state: paused;
              transform: translateY(-1px) scale(1.02);
            }

            /* Internship shimmer effect on hover */
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
              background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%);
              transform: skewX(-18deg);
              pointer-events: none;
            }
            .shimmer-btn:hover::before {
              animation: shimmer 1.1s linear forwards;
            }
            @keyframes shimmer {
              to { left: 120%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
