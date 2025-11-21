import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import authService from "../services/authService";
import { logout as logoutAction } from "../redux/authslice";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", mega: true },
  { label: "About", to: "/about" },
  { label: "Placements", placement: true },
 
  { label: "Book demo", to: "/book-demo", cta: true },
];

const footerNav = [
  { label: "Programs", to: "/about" },
  { label: "Playground", to: "/play" },
  { label: "Careers", to: "/about" },
  { label: "Support", to: "/about" },
];

const courseCollections = [
  {
    name: "Product & Engineering",
    summary: "Cross-discipline programs that take builders from MVPs to production scale.",
    items: [
      {
        title: "Full-Stack Product Engineer",
        description: "Ship React + Node apps with CI/CD, observability, and launch tactics.",
        href: "/about",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v1.5M6 7.5h12M6 7.5h-.75A2.25 2.25 0 003 9.75v8.25A2.25 2.25 0 005.25 20.25h13.5A2.25 2.25 0 0021 18V9.75A2.25 2.25 0 0018.75 7.5H18M6 7.5V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v1.5" />
          </svg>
        ),
        accent: "bg-sky-100 text-sky-500 dark:bg-sky-500/10 dark:text-sky-300",
      },
      {
        title: "AI & ML Systems",
        description: "Deploy applied AI backed by MLOps, eval suites, and LLM patterns.",
        href: "/about",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        ),
        accent: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
      },
    ],
  },
  {
    name: "Data & Design",
    summary: "Transform raw insights into polished experiences and exec-grade dashboards.",
    items: [
      {
        title: "Data Engineering Catalyst",
        description: "Modern pipelines, metadata ops, and analytics reliability playbooks.",
        href: "/about",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75v10.5A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V6.75m-13.5 0A2.25 2.25 0 0110.5 4.5h3a2.25 2.25 0 012.25 2.25m-7.5 0h7.5" />
          </svg>
        ),
        accent: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300",
      },
      {
        title: "Product Design Studio",
        description: "Systems thinking, UX research, and prototyping for venture-ready UX.",
        href: "/about",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5M6 4.5h12A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18V6A1.5 1.5 0 016 4.5z" />
          </svg>
        ),
        accent: "bg-rose-100 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300",
      },
    ],
  },
];

const courseSpotlight = {
  label: "Next cohort",
  title: "Systems Leadership Accelerator",
  description: "6-week intensive with live build reviews, async labs, and executive mentors.",
  highlights: ["Daily design critiques", "Career concierge support", "Industry-backed capstone"],
  ctaLabel: "Explore program",
  ctaHref: "/about",
};

const placementLinks = [
  {
    label: "Alumni",
    description: "Success stories, outcomes, and placement highlights.",
    to: "/placements/alumni",
  },
  {
    label: "Recruiters",
    description: "Hire-ready talent pools and partner benefits.",
    to: "/placements/recruiters",
  },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.18 11.82-11.82 11.82-2.35 0-4.53-.69-6.37-1.88.33.04.64.05.98.05 1.94 0 3.72-.66 5.14-1.78a4.17 4.17 0 01-3.89-2.89c.26.04.52.07.79.07.38 0 .75-.05 1.1-.15a4.16 4.16 0 01-3.34-4.08v-.05c.56.31 1.2.5 1.88.52a4.16 4.16 0 01-1.85-3.47c0-.77.21-1.48.58-2.1a11.82 11.82 0 008.58 4.35 4.7 4.7 0 01-.1-.95 4.16 4.16 0 017.2-2.84 8.2 8.2 0 002.64-1 4.13 4.13 0 01-1.83 2.3 8.4 8.4 0 002.39-.64 8.8 8.8 0 01-2.09 2.17z" />
      </svg>
    ) },
  { label: "LinkedIn", href: "https://linkedin.com", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.27 2.372 4.27 5.459v6.282zM5.337 7.433a2.062 2.062 0 01-2.063-2.063 2.062 2.062 0 112.063 2.063zM6.967 20.452H3.705V9h3.262v11.452z" />
      </svg>
    ) },
  { label: "YouTube", href: "https://youtube.com", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.8 8.001s-.2-1.4-.8-2.01c-.76-.8-1.6-.8-1.99-.85-2.78-.2-6.95-.2-6.95-.2h-.01s-4.17 0-6.95.2c-.39.05-1.23.05-1.99.85-.6.61-.8 2.01-.8 2.01S3 9.6 3 11.2v1.59c0 1.6.2 3.2.2 3.2s.2 1.4.8 2.01c.76.8 1.76.77 2.2.86 1.6.15 6.8.2 6.8.2s4.18-.01 6.96-.21c.39-.05 1.23-.05 1.99-.85.6-.61.8-2.01.8-2.01s.2-1.6.2-3.2v-1.59c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l4.67 2.5L10 14.5z" />
      </svg>
    ) },
];

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isPlacementsOpen, setIsPlacementsOpen] = useState(false);
  const [isCoursesMobileOpen, setIsCoursesMobileOpen] = useState(false);
  const [isPlacementsMobileOpen, setIsPlacementsMobileOpen] = useState(false);
  const [showAllMobileCourses, setShowAllMobileCourses] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const coursesTriggerRef = useRef(null);
  const coursesMenuRef = useRef(null);
  const coursesHoverTimeoutRef = useRef(null);
  const placementsTriggerRef = useRef(null);
  const placementsMenuRef = useRef(null);
  const placementsHoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isCoursesOpen && !isPlacementsOpen) return undefined;

    const handleClickOutside = (event) => {
      const triggerEl = coursesTriggerRef.current;
      const menuEl = coursesMenuRef.current;
      if (isCoursesOpen && menuEl && !menuEl.contains(event.target) && triggerEl && !triggerEl.contains(event.target)) {
        setIsCoursesOpen(false);
      }

      const placementTriggerEl = placementsTriggerRef.current;
      const placementMenuEl = placementsMenuRef.current;
      if (
        isPlacementsOpen &&
        placementMenuEl &&
        !placementMenuEl.contains(event.target) &&
        placementTriggerEl &&
        !placementTriggerEl.contains(event.target)
      ) {
        setIsPlacementsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCoursesOpen(false);
        setIsPlacementsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCoursesOpen, isPlacementsOpen]);

  useEffect(
    () => () => {
      if (coursesHoverTimeoutRef.current) {
        clearTimeout(coursesHoverTimeoutRef.current);
      }
      if (placementsHoverTimeoutRef.current) {
        clearTimeout(placementsHoverTimeoutRef.current);
      }
    },
    []
  );

  const closeSidebar = () => {
    setSidebarOpen(false);
    setIsCoursesMobileOpen(false);
    setIsPlacementsMobileOpen(false);
    setShowAllMobileCourses(false);
  };
  const goToProfile = () => {
    closeSidebar();
    navigate("/profile");
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch(logoutAction());
      setLoggingOut(false);
      closeSidebar();
      navigate("/");
    }
  };

  const openCoursesHoverMenu = () => {
    if (coursesHoverTimeoutRef.current) {
      clearTimeout(coursesHoverTimeoutRef.current);
    }
    setIsCoursesOpen(true);
  };

  const closeCoursesHoverMenu = () => {
    coursesHoverTimeoutRef.current = setTimeout(() => {
      setIsCoursesOpen(false);
    }, 150);
  };

  const openPlacementsHoverMenu = () => {
    if (placementsHoverTimeoutRef.current) {
      clearTimeout(placementsHoverTimeoutRef.current);
    }
    setIsPlacementsOpen(true);
  };

  const closePlacementsHoverMenu = () => {
    placementsHoverTimeoutRef.current = setTimeout(() => {
      setIsPlacementsOpen(false);
    }, 150);
  };

  const toggleCoursesMobileAccordion = () => {
    setIsCoursesMobileOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowAllMobileCourses(false);
      }
      return next;
    });
  };

  const togglePlacementsMobileAccordion = () => {
    setIsPlacementsMobileOpen((prev) => !prev);
  };

  const filteredLinks = navLinks.filter((link) => {
    if (link.authOnly === true) {
      return isAuthenticated;
    }
    if (link.authOnly === false) {
      return !isAuthenticated;
    }
    return true;
  });

  const mobileCourseItems = courseCollections.flatMap((collection) =>
    collection.items.map((item) => ({
      ...item,
      collectionName: collection.name,
    }))
  );
  const visibleMobileCourses = showAllMobileCourses ? mobileCourseItems : mobileCourseItems.slice(0, 2);
  const canShowMoreMobileCourses = mobileCourseItems.length > visibleMobileCourses.length;

  const userLabel =
    user?.name ||
    user?.identifier ||
    user?.email ||
    user?.deviceName ||
    user?.userId ||
    "Signed in";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20">
        <div className="border-b border-slate-200/70 bg-slate-50 text-[13px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          <div className="mx-auto flex max-w-6xl  g px-4 py-3 flex-row items-center justify-between sm:px-6 lg:px-8">
            <div className="hidden md:flex md:flex-wrap md:items-center gap-4 text-slate-600 dark:text-slate-200">
              <span className="inline-flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-3.482a1.5 1.5 0 00-1.211-1.473l-2.8-.56a1.5 1.5 0 00-1.513.624l-.97 1.293c-2.682-1.2-4.863-3.38-6.063-6.063l1.293-.97a1.5 1.5 0 00.624-1.513l-.56-2.8A1.5 1.5 0 008.482 3h-3.482a1.5 1.5 0 00-1.5 1.5v2.25z" />
                </svg>
                1800-120-4748
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 2.25h6a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 19.5v-15A2.25 2.25 0 019 2.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18.75h6" />
                </svg>
                Download Mobile App
              </span>
              <span className="hidden items-center gap-1.5 md:inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5m-4.5-5.25h9m3.75 1.5V7.125a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25v9.75a2.25 2.25 0 002.25 2.25h7.125" />
                </svg>
                Blogs
              </span>
            </div>

            <div className="flex justify-start md:justify-center">
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-rose-600/30">
              Job Mela
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-100">
              <button type="button" className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide dark:border-white/30">
                 Career Guidance
              </button>
              {!isAuthenticated ? (
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1 transition hover:border-slate-400 dark:border-white/30 dark:hover:border-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
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
              <div className="hidden lg:flex lg:items-center gap-2 text-slate-500 dark:text-slate-200">
                {[
                  { label: "Facebook", href: "https://facebook.com", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.5 9H15V6h-1.5c-2.2 0-3.75 1.46-3.75 3.75V12H8v3h1.75v6h3v-6H15l.5-3h-2v-1.5c0-.48.23-.75.75-.75z" />
                      </svg>
                    ) },
                  { label: "Instagram", href: "https://instagram.com", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.51 5.51 0 0012 7.5zm0 2A3.5 3.5 0 1115.5 13 3.5 3.5 0 0112 9.5zm5.25-3.75a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z" />
                      </svg>
                    ) },
                  { label: "YouTube", href: "https://youtube.com", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.8 8.001s-.2-1.4-.8-2.01c-.59-.62-1.1-.77-2.31-.83-1.19-.06-4.69-.06-4.69-.06s-3.5 0-4.69.06c-1.21.06-1.72.21-2.31.83-.6.61-.8 2.01-.8 2.01S6 9.6 6 11.2v1.59c0 1.6.2 3.2.2 3.2s.2 1.4.8 2.01c.59.62 1.37.6 1.72.67 1.25.12 4.48.16 4.48.16s3.5 0 4.69-.06c1.21-.06 1.72-.21 2.31-.83.6-.61.8-2.01.8-2.01s.2-1.6.2-3.2v-1.59c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l4.67 2.5z" />
                      </svg>
                    ) },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.27 2.372 4.27 5.459v6.282zM5.337 7.433a2.062 2.062 0 01-2.063-2.063 2.062 2.062 0 112.063 2.063zM6.967 20.452H3.705V9h3.262v11.452z" />
                      </svg>
                    ) },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-slate-400 dark:border-white/20 dark:text-white dark:hover:border-white"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white" onClick={closeSidebar}>
              XYNAPSE SYSTEMS
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {filteredLinks.map((link) =>
                link.mega ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openCoursesHoverMenu}
                    onMouseLeave={closeCoursesHoverMenu}
                  >
                    <button
                      type="button"
                      ref={coursesTriggerRef}
                      aria-expanded={isCoursesOpen}
                      aria-haspopup="true"
                      aria-controls="courses-mega-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isCoursesOpen ? "text-sky-600 dark:text-sky-400" : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() => setIsCoursesOpen((prev) => !prev)}
                      onFocus={openCoursesHoverMenu}
                      onBlur={closeCoursesHoverMenu}
                    >
                      Courses
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${isCoursesOpen ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      id="courses-mega-menu"
                      ref={coursesMenuRef}
                      className={`absolute left-1/2 top-full z-10 mt-4 w-[min(90vw,52rem)] -translate-x-1/2 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 transition-all duration-200 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isCoursesOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
                          {courseCollections.map((collection) => (
                            <div key={collection.name} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 transition hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900/70">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{collection.name}</p>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{collection.summary}</p>
                              <div className="mt-4 space-y-3">
                                {collection.items.map((item) => (
                                  <Link
                                    key={item.title}
                                    to={item.href}
                                    className="flex items-start gap-3 rounded-2xl border border-slate-200/70 px-3 py-2 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:border-slate-700"
                                  >
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.accent}`}>{item.icon}</div>
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-inner dark:border-slate-700">
                          <p className="text-xs uppercase tracking-wider text-slate-300">{courseSpotlight.label}</p>
                          <p className="mt-2 text-lg font-semibold">{courseSpotlight.title}</p>
                          <p className="mt-2 text-sm text-slate-200">{courseSpotlight.description}</p>
                          <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                            {courseSpotlight.highlights.map((highlight) => (
                              <li key={highlight} className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                          <Link
                            to={courseSpotlight.ctaHref}
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                          >
                            {courseSpotlight.ctaLabel}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      <Link
                        to="/about"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                      >
                        Know more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : link.placement ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openPlacementsHoverMenu}
                    onMouseLeave={closePlacementsHoverMenu}
                  >
                    <button
                      type="button"
                      ref={placementsTriggerRef}
                      aria-expanded={isPlacementsOpen}
                      aria-haspopup="true"
                      aria-controls="placements-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isPlacementsOpen ? "text-sky-600 dark:text-sky-400" : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() => setIsPlacementsOpen((prev) => !prev)}
                      onFocus={openPlacementsHoverMenu}
                      onBlur={closePlacementsHoverMenu}
                    >
                      Placements
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${isPlacementsOpen ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      id="placements-menu"
                      ref={placementsMenuRef}
                      className={`absolute left-1/2 top-full z-10 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 transition-all duration-150 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isPlacementsOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="space-y-3">
                        {placementLinks.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="block rounded-xl border border-slate-200/80 px-3 py-2 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                          >
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : link.placement ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openPlacementsHoverMenu}
                    onMouseLeave={closePlacementsHoverMenu}
                  >
                    <button
                      type="button"
                      ref={placementsTriggerRef}
                      aria-expanded={isPlacementsOpen}
                      aria-haspopup="true"
                      aria-controls="placements-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isPlacementsOpen ? "text-sky-600 dark:text-sky-400" : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() => setIsPlacementsOpen((prev) => !prev)}
                      onFocus={openPlacementsHoverMenu}
                      onBlur={closePlacementsHoverMenu}
                    >
                      Placements
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${isPlacementsOpen ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      id="placements-menu"
                      ref={placementsMenuRef}
                      className={`absolute left-1/2 top-full z-10 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 transition-all duration-150 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isPlacementsOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="space-y-3">
                        {placementLinks.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="block rounded-xl border border-slate-200/80 px-3 py-2 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                          >
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : link.cta ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition hover:text-sky-500 ${
                      location.pathname === link.to
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <ThemeToggle />
              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToProfile}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {userLabel}
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900"
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm dark:border-slate-700 dark:text-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span>Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white/95 p-6 shadow-2xl transition lg:hidden dark:bg-slate-950/95 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-slate-900 dark:text-white" onClick={closeSidebar}>
            XYNAPSE SYSTEMS
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="rounded-full border border-slate-200 p-2 dark:border-slate-700"
            onClick={closeSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-3">
          {filteredLinks.map((link) =>
            link.mega ? (
              <div key={link.label} className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
                  onClick={toggleCoursesMobileAccordion}
                >
                  <span>Courses</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-5 w-5 transition ${isCoursesMobileOpen ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isCoursesMobileOpen && (
                  <div className="grid gap-4">
                    {visibleMobileCourses.map((item) => (
                      <Link
                        key={`${item.collectionName}-${item.title}`}
                        to={item.href}
                        onClick={closeSidebar}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-3 transition hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900/70"
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.accent}`}>{item.icon}</div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.collectionName}</p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="flex flex-wrap gap-3">
                      {canShowMoreMobileCourses ? (
                        <button
                          type="button"
                          onClick={() => setShowAllMobileCourses(true)}
                          className="flex-1 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-600 dark:text-slate-200"
                        >
                          Show more
                        </button>
                      ) : (
                        visibleMobileCourses.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setShowAllMobileCourses(false)}
                            className="flex-1 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-600 dark:text-slate-200"
                          >
                            Show less
                          </button>
                        )
                      )}
                      <Link
                        to="/about"
                        onClick={closeSidebar}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                      >
                        Know more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : link.placement ? (
              <div key={link.label} className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
                  onClick={togglePlacementsMobileAccordion}
                >
                  <span>Placements</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-5 w-5 transition ${isPlacementsMobileOpen ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isPlacementsMobileOpen && (
                  <div className="space-y-3">
                    {placementLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={closeSidebar}
                        className="block rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                      >
                        <p>{item.label}</p>
                        <p className="text-xs font-normal text-slate-500 dark:text-slate-400">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : link.cta ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeSidebar}
                className="block rounded-2xl bg-sky-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeSidebar}
                className={`block rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  location.pathname === link.to
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/70"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          {isAuthenticated && (
            <button
              type="button"
              onClick={goToProfile}
              className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {userLabel}
            </button>
          )}
        </nav>
        <div className="mt-8 space-y-3">
          <ThemeToggle />
          {isAuthenticated && (
            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          aria-hidden
          onClick={closeSidebar}
        />
      )}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>

      <footer className="mt-12 border-t border-slate-200/70 bg-white/60 px-4 py-10 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
             XYNAPSE SYSTEMS
            </Link>
            <p>
              Cohort-based learning, live mentorship, and production-grade projects that turn ambition into offers.
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
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-slate-700 transition hover:text-sky-500 dark:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-200/60 pt-6 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} AuthFlow. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-sky-500">
              Privacy
            </Link>
            <Link to="/about" className="hover:text-sky-500">
              Terms
            </Link>
            <Link to="/about" className="hover:text-sky-500">
              Accessibility
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
