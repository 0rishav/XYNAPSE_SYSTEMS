import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import courseService from "../../services/courseService";
import CollaborationPage from "./CollaborationPage";
import CourseSection from "./CourseSection";
import SuccessStories from "./SuccessStories";
import HiringPartner from "./HiringPartner";
import WorkingProfessional from "./WorkingProfessional";
import EnquiryForm from "./EnquiryForm";
import FutureLearning from "./FutureLearning";
import AwardSection from "./AwardSection";
import About from "./About";
import HeroSection from "./HeroSection";
import SEO from "../../components/SEO";

export function AnimatedReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransforms = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    scale: "opacity-0 scale-95",
  };
  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? visibleClasses
          : (hiddenTransforms[variant] ?? hiddenTransforms.up)
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Landing() {
  const [topCourses, setTopCourses] = useState([]);
  const [topCoursesLoading, setTopCoursesLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTopCourses() {
      setTopCoursesLoading(true);
      try {
        const data = await courseService.getAllCourses();
        console.log(data);
        if (mounted) setTopCourses(data.data || []);
      } catch (err) {
        console.warn("Failed to load top courses", err);
        if (mounted) setTopCourses([]);
      } finally {
        if (mounted) setTopCoursesLoading(false);
      }
    }

    loadTopCourses();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Software Training & IT Solutions"
        description="Xynapse Systems offers industry-focused software training, IT solutions, and career-oriented programs for students and working professionals."
        canonical="https://xynapsesystems.com/"
        image="https://xynapsesystems.com/images/Logo.png"
      />
      <main className="min-h-screen text-slate-900 dark:text-slate-50">
        <div className="space-y-16 px-0 py-12 sm:px-0 lg:px-0 max-w-[1800px] mx-auto">
          {/* Hero Section */}
          <HeroSection />

          <CollaborationPage />

          <CourseSection
            topCoursesLoading={topCoursesLoading}
            topCourses={topCourses}
          />

          <SuccessStories />

          <HiringPartner />

          <WorkingProfessional />

          <EnquiryForm />

          <FutureLearning />

          <AwardSection />

          <About />
        </div>
      </main>
    </>
  );
}

export default Landing;
