import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import authService from "../services/authService";
import courseService from "../services/courseService";
import { logout as logoutAction } from "../redux/authslice";
import FormModal from "./layout/FormModal";
import InternshipModal from "./layout/InternshipModal";
import axiosInstance from "../utils/axiosInstance";
import FloatingAction from "./FloatingAction";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", mega: true },
  { label: "Branches", branches: true },
  { label: "Colleges", college: true },
  {
    label: "Discover",
    dropdown: true,
    items: [
      { label: "About", to: "/about" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  { label: "Placements", placement: true },

  { label: "Book demo", to: "/book-demo", cta: true },
];

const footerNav = [
  { label: "Programs", to: "/about" },
  { label: "Playground", to: "/play" },
  { label: "Careers", to: "/about" },
  { label: "Support", to: "/about" },
];

// courseCollections removed — using backend-provided collections only

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

const branches = [
  {
    name: "Ameerpet",
    phone: "+91 78159 24610",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/ameerpet.webp",
    id: "ameerpet",
  },
  {
    name: "Hitec City",
    phone: "+91 78159 24622",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/secunderabad.webp",
    id: "hitec-city",
  },
  {
    name: "Secunderabad",
    phone: "+91 92814 66365",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/bangalore.webp",
    id: "secunderabad",
  },
  {
    name: "Dilsukhnagar",
    phone: "+91 78159 24700",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/bangalore.webp",
    id: "dilsukhnagar",
  },
  {
    name: "Mehdipatnam",
    phone: "+91 98660 47567",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/secunderabad.webp",
    id: "mehdipatnam",
  },
  {
    name: "Kukatpally",
    phone: "+91 86884 08352",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/bangalore.webp",
    id: "kukatpally",
  },
  {
    name: "Bangalore",
    phone: "+91 70754 63275",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/secunderabad.webp",
    id: "bangalore",
  },
  {
    name: "Visakhapatnam",
    phone: "+91 91333 08352",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/bangalore.webp",
    id: "visakhapatnam",
  },
  {
    name: "Delhi",
    phone: "+91 91333 08352",
    icon: "	https://teksacademynewwebsite.s3.ap-south-1.amazonaws.com/assets/img/branchnavimg/salem.webp",
    id: "visakhapsasaatnam",
  },
];

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.18 11.82-11.82 11.82-2.35 0-4.53-.69-6.37-1.88.33.04.64.05.98.05 1.94 0 3.72-.66 5.14-1.78a4.17 4.17 0 01-3.89-2.89c.26.04.52.07.79.07.38 0 .75-.05 1.1-.15a4.16 4.16 0 01-3.34-4.08v-.05c.56.31 1.2.5 1.88.52a4.16 4.16 0 01-1.85-3.47c0-.77.21-1.48.58-2.1a11.82 11.82 0 008.58 4.35 4.7 4.7 0 01-.1-.95 4.16 4.16 0 017.2-2.84 8.2 8.2 0 002.64-1 4.13 4.13 0 01-1.83 2.3 8.4 8.4 0 002.39-.64 8.8 8.8 0 01-2.09 2.17z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.27 2.372 4.27 5.459v6.282zM5.337 7.433a2.062 2.062 0 01-2.063-2.063 2.062 2.062 0 112.063 2.063zM6.967 20.452H3.705V9h3.262v11.452z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M21.8 8.001s-.2-1.4-.8-2.01c-.76-.8-1.6-.8-1.99-.85-2.78-.2-6.95-.2-6.95-.2h-.01s-4.17 0-6.95.2c-.39.05-1.23.05-1.99.85-.6.61-.8 2.01-.8 2.01S3 9.6 3 11.2v1.59c0 1.6.2 3.2.2 3.2s.2 1.4.8 2.01c.76.8 1.76.77 2.2.86 1.6.15 6.8.2 6.8.2s4.18-.01 6.96-.21c.39-.05 1.23-.05 1.99-.85.6-.61.8-2.01.8-2.01s.2-1.6.2-3.2v-1.59c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l4.67 2.5L10 14.5z" />
      </svg>
    ),
  },
];

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topCourses, setTopCourses] = useState([]);
  const [topCoursesLoading, setTopCoursesLoading] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isPlacementsOpen, setIsPlacementsOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [isCollegesOpen, setIsCollegesOpen] = useState(false);
  const [isCoursesMobileOpen, setIsCoursesMobileOpen] = useState(false);
  const [isPlacementsMobileOpen, setIsPlacementsMobileOpen] = useState(false);
  const [isDiscoverMobileOpen, setIsDiscoverMobileOpen] = useState(false);
  const [isBranchesMobileOpen, setIsBranchesMobileOpen] = useState(false);
  const [showAllMobileCourses, setShowAllMobileCourses] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const coursesTriggerRef = useRef(null);
  const coursesMenuRef = useRef(null);
  const coursesHoverTimeoutRef = useRef(null);
  const discoverTriggerRef = useRef(null);
  const discoverMenuRef = useRef(null);
  const discoverHoverTimeoutRef = useRef(null);
  const branchesTriggerRef = useRef(null);
  const branchesMenuRef = useRef(null);
  const branchesHoverTimeoutRef = useRef(null);
  const collegesTriggerRef = useRef(null);
  const collegesMenuRef = useRef(null);
  const collegesHoverTimeoutRef = useRef(null);
  const placementsTriggerRef = useRef(null);
  const placementsMenuRef = useRef(null);
  const placementsHoverTimeoutRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalBranch, setModalBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const [formDataFormModal, setFormDataFormModal] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    courseId: "",
  });

  const [formDataInternshipModal, setFormDataInternshipModal] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    courseId: "",
    year: "",
    department: "",
    linkedin: "",
    portfolio: "",
  });

  const openModal = (type, branch) => {
    setModalType(type);
    setModalBranch(branch);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalBranch(null);
    if (modalType === "enroll") {
      setFormDataFormModal({
        name: "",
        email: "",
        phone: "",
        city: "",
        course: "",
      });
    } else if (modalType === "internship") {
      setFormDataInternshipModal({
        name: "",
        email: "",
        phone: "",
        resume: null,
        course: "",
        year: "",
        department: "",
        linkedin: "",
        portfolio: "",
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (modalType === "enroll") {
      setFormDataFormModal((prev) => ({ ...prev, [name]: value }));
    } else if (modalType === "internship") {
      setFormDataInternshipModal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (modalType === "internship") {
      setFormDataInternshipModal((prev) => ({ ...prev, resume: file }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit =
        modalType === "enroll" ? formDataFormModal : formDataInternshipModal;

      if (modalType === "enroll") {
        const { data } = await axiosInstance.post("/courseForm/create-form", {
          name: dataToSubmit.name,
          email: dataToSubmit.email,
          mobile: dataToSubmit.phone,
          city: dataToSubmit.city,
          courseId: dataToSubmit.course,
        });

        if (data.success) {
          alert(data.message);
          closeModal();
        }
      } else if (modalType === "internship") {
        const formData = new FormData();
        for (let key in dataToSubmit) {
          if (key === "resume" && dataToSubmit.resume) {
            formData.append("resumeUrl", dataToSubmit.resume);
          } else {
            formData.append(key, dataToSubmit[key]);
          }
        }

        const { data } = await axiosInstance.post(
          "/internship/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data.success) {
          alert(data.message);
          closeModal();
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        error;
      console.error(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/course/all-courses");

      if (data.success) {
        const options = data.data.map((c) => ({
          value: c._id,
          label: c.title,
        }));
        setCourses(options);
      } else {
        console.warn("API returned success=false", data);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  fetchCourses();
}, []);

  useEffect(() => {
    if (
      !isCoursesOpen &&
      !isPlacementsOpen &&
      !isDiscoverOpen &&
      !isBranchesOpen &&
      !isCollegesOpen
    )
      return undefined;

    const handleClickOutside = (event) => {
      const triggerEl = coursesTriggerRef.current;
      const menuEl = coursesMenuRef.current;
      if (
        isCoursesOpen &&
        menuEl &&
        !menuEl.contains(event.target) &&
        triggerEl &&
        !triggerEl.contains(event.target)
      ) {
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
      const discoverTriggerEl = discoverTriggerRef.current;
      const discoverMenuEl = discoverMenuRef.current;
      if (
        isDiscoverOpen &&
        discoverMenuEl &&
        !discoverMenuEl.contains(event.target) &&
        discoverTriggerEl &&
        !discoverTriggerEl.contains(event.target)
      ) {
        setIsDiscoverOpen(false);
      }
      const branchesTriggerEl = branchesTriggerRef.current;
      const branchesMenuEl = branchesMenuRef.current;
      if (
        isBranchesOpen &&
        branchesMenuEl &&
        !branchesMenuEl.contains(event.target) &&
        branchesTriggerEl &&
        !branchesTriggerEl.contains(event.target)
      ) {
        setIsBranchesOpen(false);
      }
      const collegesTriggerEl = collegesTriggerRef.current;
      const collegesMenuEl = collegesMenuRef.current;
      if (
        isCollegesOpen &&
        collegesMenuEl &&
        !collegesMenuEl.contains(event.target) &&
        collegesTriggerEl &&
        !collegesTriggerEl.contains(event.target)
      ) {
        setIsCollegesOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCoursesOpen(false);
        setIsPlacementsOpen(false);
        setIsDiscoverOpen(false);
        setIsBranchesOpen(false);
        setIsCollegesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isCoursesOpen,
    isPlacementsOpen,
    isDiscoverOpen,
    isBranchesOpen,
    isCollegesOpen,
  ]);

  useEffect(
    () => () => {
      if (coursesHoverTimeoutRef.current) {
        clearTimeout(coursesHoverTimeoutRef.current);
      }
      if (placementsHoverTimeoutRef.current) {
        clearTimeout(placementsHoverTimeoutRef.current);
      }
      if (discoverHoverTimeoutRef.current) {
        clearTimeout(discoverHoverTimeoutRef.current);
      }
      if (branchesHoverTimeoutRef.current) {
        clearTimeout(branchesHoverTimeoutRef.current);
      }
      if (collegesHoverTimeoutRef.current) {
        clearTimeout(collegesHoverTimeoutRef.current);
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
      console.log(error)
      console.error(error.message || error);
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
    // close other menus when opening courses
    setIsBranchesOpen(false);
    setIsPlacementsOpen(false);
    setIsDiscoverOpen(false);
    setIsCoursesOpen(true);
  };

  const closeCoursesHoverMenu = () => {
    setIsCoursesOpen(false);
  };

  const openPlacementsHoverMenu = () => {
    if (placementsHoverTimeoutRef.current) {
      clearTimeout(placementsHoverTimeoutRef.current);
    }
    // close other menus when opening placements
    setIsBranchesOpen(false);
    setIsCoursesOpen(false);
    setIsDiscoverOpen(false);
    setIsPlacementsOpen(true);
  };

  const openBranchesHoverMenu = () => {
    if (branchesHoverTimeoutRef.current) {
      clearTimeout(branchesHoverTimeoutRef.current);
    }
    // close other menus when opening branches
    setIsCoursesOpen(false);
    setIsPlacementsOpen(false);
    setIsDiscoverOpen(false);
    setIsBranchesOpen(true);
  };

  const openCollegesHoverMenu = () => {
    if (collegesHoverTimeoutRef.current) {
      clearTimeout(collegesHoverTimeoutRef.current);
    }
    // close other menus when opening colleges
    setIsCoursesOpen(false);
    setIsPlacementsOpen(false);
    setIsDiscoverOpen(false);
    setIsBranchesOpen(false);
    setIsCollegesOpen(true);
  };

  const closeCollegesHoverMenu = () => {
    collegesHoverTimeoutRef.current = setTimeout(() => {
      setIsCollegesOpen(false);
    }, 150);
  };

  const openDiscoverHoverMenu = () => {
    if (discoverHoverTimeoutRef.current) {
      clearTimeout(discoverHoverTimeoutRef.current);
    }
    // close other menus when opening discover
    setIsBranchesOpen(false);
    setIsCoursesOpen(false);
    setIsPlacementsOpen(false);
    setIsDiscoverOpen(true);
  };

  // Fetch 8 courses for mega menu
  useEffect(() => {
    let mounted = true;
    async function loadCourses() {
      setTopCoursesLoading(true);
      try {
        const resp = await courseService.getAllCourses({ page: 1, limit: 8 });
        if (!mounted) return;
        setTopCourses(resp?.data || []);
      } catch (err) {
        console.error("Failed to load courses", err?.message || err);
      } finally {
        if (mounted) setTopCoursesLoading(false);
      }
    }

    loadCourses();

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch dynamic course collections from backend and group by category

  const closePlacementsHoverMenu = () => {
    placementsHoverTimeoutRef.current = setTimeout(() => {
      setIsPlacementsOpen(false);
    }, 150);
  };

  const closeBranchesHoverMenu = () => {
    branchesHoverTimeoutRef.current = setTimeout(() => {
      setIsBranchesOpen(false);
    }, 150);
  };

  const closeDiscoverHoverMenu = () => {
    discoverHoverTimeoutRef.current = setTimeout(() => {
      setIsDiscoverOpen(false);
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

  const toggleBranchesMobileAccordion = () => {
    setIsBranchesMobileOpen((prev) => !prev);
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

  const mobileCourseItems =
    topCourses && topCourses.length
      ? topCourses.map((c) => ({
          title: c.title,
          href: `/course/${c._id}`,
          description: c.shortDescription || c.description || "",
          collectionName: "Courses",
          accent: "bg-sky-100/60",
          icon: (
            <img
              src={c.thumbnail?.secure_url}
              alt={c.title}
              className="h-6 w-6 rounded-md object-cover"
            />
          ),
        }))
      : [];
  const visibleMobileCourses = showAllMobileCourses
    ? mobileCourseItems
    : mobileCourseItems.slice(0, 2);
  const canShowMoreMobileCourses =
    mobileCourseItems.length > visibleMobileCourses.length;

  const userLabel =
    user?.name ||
    user?.identifier ||
    user?.email ||
    user?.deviceName ||
    user?.userId ||
    "Signed in";

  return (
   <>
    <div className="min-h-screen">
      <header className="sticky top-0 z-20">
        <TopBar
          openModal={openModal}
          isAuthenticated={isAuthenticated}
          goToProfile={goToProfile}
          userLabel={userLabel}
          socials={socials}
        />

        <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto max-w-[1450px] flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
              onClick={closeSidebar}
            >
              XYNAPSE SYSTEMS
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {filteredLinks.map((link) =>
                link.college ? (
                  <div key={link.label} className="relative">
                    <button
                      type="button"
                      ref={collegesTriggerRef}
                      aria-expanded={isCollegesOpen}
                      aria-haspopup="true"
                      aria-controls="colleges-mega-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isCollegesOpen
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() => setIsCollegesOpen((prev) => !prev)}
                      onMouseEnter={openCollegesHoverMenu}
                      onMouseLeave={closeCollegesHoverMenu}
                      onFocus={openCollegesHoverMenu}
                      onBlur={closeCollegesHoverMenu}
                    >
                      Colleges
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${
                          isCollegesOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    <div
                      id="colleges-mega-menu"
                      ref={collegesMenuRef}
                      onMouseEnter={openCollegesHoverMenu}
                      onMouseLeave={closeCollegesHoverMenu}
                      className={`absolute left-1/2 top-full z-10 mt-0 w-[min(90vw,64rem)] -translate-x-1/2 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 transition-opacity duration-200 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isCollegesOpen
                          ? "pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="grid gap-6 md:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-semibold">
                            {" "}
                            College Partners
                          </h4>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            <li>Our College Tie-ups</li>
                            <li>MoU Partnerships</li>
                            <li>Campus Training Programs</li>
                            <li>College Workshops &amp; Seminars</li>
                            <li>Internship Collaboration</li>
                            <li>Placement Support for Colleges</li>
                            <li>Skill Development Programs</li>
                            <li>Technical Fest Partnerships</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            Collages Classroom Trainings
                          </h4>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            <li>In-Person Training Sessions</li>
                            <li>Hands-on Practical Learning</li>
                            <li>Real-time Project Training</li>
                            <li>Beginner to Advanced Courses</li>
                            <li>Industry Expert Trainers</li>
                            <li>Weekly Assessments &amp; Assignments</li>
                            <li>Certification-Oriented Classes</li>
                            <li>Small Batch Personalized Training</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            College Connect Program
                          </h4>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            <li>Direct College Partnership</li>
                            <li>Professional Trainers Assigned</li>
                            <li>On-Campus Training Programs</li>
                            <li>Industry-Ready Skill Development</li>
                            <li>Custom Training Modules for Colleges</li>
                            <li>Semester-Based Technical Training</li>
                            <li>Workshops, Seminars &amp; Bootcamps</li>
                            <li>Internship &amp; Live Project Support</li>
                            <li>Placement Readiness &amp; Guidance</li>
                            <li>Dedicated College Relationship Manager</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : link.mega ? (
                  <div key={link.label} className="relative">
                    <button
                      type="button"
                      ref={coursesTriggerRef}
                      aria-expanded={isCoursesOpen}
                      aria-haspopup="true"
                      aria-controls="courses-mega-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isCoursesOpen
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() =>
                        setIsCoursesOpen((prev) => {
                          const next = !prev;
                          if (next) {
                            setIsBranchesOpen(false);
                            setIsPlacementsOpen(false);
                            setIsDiscoverOpen(false);
                          }
                          return next;
                        })
                      }
                      onFocus={openCoursesHoverMenu}
                      onBlur={closeCoursesHoverMenu}
                      onMouseEnter={openCoursesHoverMenu}
                      onMouseLeave={closeCoursesHoverMenu}
                    >
                      Courses
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${
                          isCoursesOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    <div
                      id="courses-mega-menu"
                      ref={coursesMenuRef}
                      onMouseEnter={openCoursesHoverMenu}
                      className={`absolute left-1/2 top-full z-10 mt-0 w-[min(90vw,52rem)] -translate-x-1/2 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 transition-opacity duration-200 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isCoursesOpen
                          ? "pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="grid gap-6 lg:grid-cols-3">
                        <div className="col-span-full">
                          {topCoursesLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-3 rounded-md p-2"
                                >
                                  <div className="h-10 w-14 rounded-md bg-slate-100 dark:bg-slate-800" />
                                  <div className="flex-1">
                                    <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : topCourses && topCourses.length ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {topCourses.map((c) => (
                                <Link
                                  key={c._id}
                                  to={`/course/${c._id}`}
                                  onClick={() => setIsCoursesOpen(false)}
                                  className="flex hover:cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/70 px-3 py-2 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:border-slate-700"
                                >
                                  <img
                                    src={c.thumbnail?.secure_url}
                                    alt={c.title}
                                    className="h-10 w-14 rounded-md object-cover"
                                  />
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                      {c.title}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {c.instructor?.name || ""}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-2 text-sm text-slate-500">
                              No courses available.
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        to="/about"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                      >
                        Know more
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
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : link.branches ? (
                  <div key={link.label} className="relative">
                    <button
                      type="button"
                      ref={branchesTriggerRef}
                      aria-expanded={isBranchesOpen}
                      aria-haspopup="true"
                      aria-controls="branches-mega-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isBranchesOpen
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() =>
                        setIsBranchesOpen((prev) => {
                          const next = !prev;
                          if (next) {
                            setIsCoursesOpen(false);
                            setIsPlacementsOpen(false);
                            setIsDiscoverOpen(false);
                          }
                          return next;
                        })
                      }
                      onMouseEnter={openBranchesHoverMenu}
                      onMouseLeave={closeBranchesHoverMenu}
                      onFocus={openBranchesHoverMenu}
                      onBlur={closeBranchesHoverMenu}
                    >
                      Branches
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${
                          isBranchesOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    <div
                      className={`absolute left-1/2 top-full z-10 mt-4 w-[min(90vw,72rem)] -translate-x-1/2`}
                    >
                      <div
                        ref={branchesMenuRef}
                        onMouseEnter={openBranchesHoverMenu}
                        onMouseLeave={closeBranchesHoverMenu}
                        id="branches-mega-menu"
                        className={`overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl transition-all duration-200 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                          isBranchesOpen
                            ? "pointer-events-auto opacity-100 translate-y-0"
                            : "pointer-events-none opacity-0 -translate-y-2"
                        }`}
                      >
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {branches.map((b) => (
                            <Link
                              key={b.id}
                              to={`/branch/${b.id}`}
                              className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-md transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 dark:border dark:border-gray-500 dark:bg-slate-900"
                            >
                              <img
                                src={b.icon}
                                alt={b.name}
                                className="h-10 w-10 flex-none"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-sky-600 hover:underline">
                                  {b.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  {b.phone}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openDiscoverHoverMenu}
                    onMouseLeave={closeDiscoverHoverMenu}
                  >
                    <button
                      type="button"
                      ref={discoverTriggerRef}
                      aria-expanded={isDiscoverOpen}
                      aria-haspopup="true"
                      aria-controls="discover-menu"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
                        isDiscoverOpen
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() =>
                        setIsDiscoverOpen((prev) => {
                          const next = !prev;
                          if (next) {
                            setIsCoursesOpen(false);
                            setIsPlacementsOpen(false);
                            setIsBranchesOpen(false);
                          }
                          return next;
                        })
                      }
                      onFocus={openDiscoverHoverMenu}
                      onBlur={closeDiscoverHoverMenu}
                    >
                      Discover
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`h-4 w-4 transition ${
                          isDiscoverOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    <div
                      id="discover-menu"
                      ref={discoverMenuRef}
                      className={`absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-lg border border-slate-200/80 bg-white/95 p-3 shadow-lg transition-all duration-150 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isDiscoverOpen
                          ? "pointer-events-auto opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <div className="space-y-1">
                        {link.items.map((it) => (
                          <Link
                            key={it.label}
                            to={it.to}
                            className="block rounded-md px-3 py-2 border border:gray-200 hover:border-sky-500 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            {it.label}
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
                        isPlacementsOpen
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                      onClick={() =>
                        setIsPlacementsOpen((prev) => {
                          const next = !prev;
                          if (next) {
                            setIsCoursesOpen(false);
                            setIsBranchesOpen(false);
                            setIsDiscoverOpen(false);
                          }
                          return next;
                        })
                      }
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
                        className={`h-4 w-4 transition ${
                          isPlacementsOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>

                    <div
                      id="placements-menu"
                      ref={placementsMenuRef}
                      className={`absolute left-1/2 top-full z-10 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 transition-all duration-150 dark:border-slate-800/80 dark:bg-slate-900/95 ${
                        isPlacementsOpen
                          ? "pointer-events-auto opacity-100 translate-y-0 animate-slide-up"
                          : "pointer-events-none opacity-0 -translate-y-2 animate-slide-down"
                      }`}
                    >
                      <div className="space-y-3">
                        {placementLinks.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="block rounded-xl border border-slate-200/80 px-3 py-2 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                          >
                            <p className="text-sm font-semibold">
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : link.cta ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 button-interactive"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white/95 p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden dark:bg-slate-950/95 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-slate-900 dark:text-white"
            onClick={closeSidebar}
          >
            XYNAPSE SYSTEMS
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="rounded-full border border-slate-200 p-2 dark:border-slate-700"
            onClick={closeSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
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
                    className={`h-5 w-5 transition ${
                      isCoursesMobileOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
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
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.accent}`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {item.collectionName}
                          </p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
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
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : link.dropdown ? (
              <div key={link.label} className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
                  onClick={() => setIsDiscoverMobileOpen((p) => !p)}
                >
                  <span>Discover</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-5 w-5 transition ${
                      isDiscoverMobileOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
                {isDiscoverMobileOpen && (
                  <div className="space-y-3 px-2">
                    {link.items.map((it) => (
                      <Link
                        key={it.label}
                        to={it.to}
                        onClick={closeSidebar}
                        className="block rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : link.branches ? (
              <div key={link.label} className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100"
                  onClick={toggleBranchesMobileAccordion}
                >
                  <span>Branches</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-5 w-5 transition ${
                      isBranchesMobileOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
                {isBranchesMobileOpen && (
                  <div className="space-y-3">
                    {branches.map((b) => (
                      <Link
                        key={b.id}
                        to={`/branch/${b.id}`}
                        onClick={closeSidebar}
                        className="block rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <img src={b.icon} alt={b.name} className="h-8 w-8" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-sky-600 hover:underline">
                              {b.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {b.phone}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
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
                    className={`h-5 w-5 transition ${
                      isPlacementsMobileOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
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
                        <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>
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
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-backdrop-fade"
          aria-hidden
          onClick={closeSidebar}
        />
      )}

      {modalType === "enroll" && (
        <FormModal
          modalOpen={modalOpen}
          modalBranch={modalBranch}
          closeModal={closeModal}
          submitForm={submitForm}
          formData={formDataFormModal}
          handleFormChange={handleFormChange}
          loading={loading}
          courses={courses}
        />
      )}

      {modalType === "internship" && (
        <InternshipModal
          modalOpen={modalOpen}
          modalBranch={modalBranch}
          closeModal={closeModal}
          submitForm={submitForm}
          formData={formDataInternshipModal}
          handleFormChange={handleFormChange}
          handleFileChange={handleFileChange}
          loading={loading}
          courses={courses}
        />
      )}

      <main className="max-w-7xl mx-auto pt-12">{children}</main>

      <Footer footerNav={footerNav} socials={socials} />
    </div>
    <FloatingAction/>
   </>
  );
}

export default Layout;
