import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ footerNav = [], socials = [] }) {
  return (
    <footer className="mt-12 border-t border-slate-200/70 bg-white/60 px-4 py-10 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            XYNAPSE SYSTEMS
          </Link>
          <p>
            Cohort-based learning, live mentorship, and production-grade
            projects that turn ambition into offers.
          </p>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 text-slate-600 transition hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:text-slate-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Explore</p>
          {footerNav.map((item) => (
            <Link key={item.label} to={item.to} className="text-sm font-medium text-slate-700 transition hover:text-sky-500 dark:text-slate-200">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-200/60 pt-6 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} AuthFlow. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-sky-500">Privacy</Link>
          <Link to="/about" className="hover:text-sky-500">Terms</Link>
          <Link to="/about" className="hover:text-sky-500">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
