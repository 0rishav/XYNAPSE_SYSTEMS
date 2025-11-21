import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const acronym = [
  { letter: "T", text: "Transferring" },
  { letter: "E", text: "Expert’s" },
  { letter: "K", text: "Knowledge to" },
  { letter: "S", text: "Students" },
];

const collaborationLogos = [
  "Skill India",
  "NSDC",
  "DDU-GKY",
  "ISO",
  "NASSCOM",
  "MSDE",
];

const successStories = {
  learning: [
    {
      name: "Chandravardhan",
      program: "Full Stack Java",
      type: "Video Testimonial",
      img: "/images/exp-1.jpg",
    },
    {
      name: "Shandruth",
      program: "Full Stack Python",
      type: "Classroom Journey",
      img: "/images/exp-2.jpg",
    },
    {
      name: "Srinivas",
      program: "Data Science",
      type: "Mentor Review",
      img: "/images/exp-3.jpg",
    },
  ],
  placed: [
    {
      name: "Sushmitha",
      program: "UI/UX",
      type: "Offer Letter Reveal",
      img: "/images/stu-1.jpg",
    },
    {
      name: "Bhargav",
      program: "Cyber Security",
      type: "Career Switch",
      img: "/images/stu-2.jpg",
    },
    {
      name: "Rahul",
      program: "Cloud Computing",
      type: "Placement Story",
      img: "/images/stu-3.jpg",
    },
  ],
};

const placementReviews = [
  {
    name: "Chandravardhan",
    track: "Full Stack Java",
    feedback:
      "Teks Academy shaped my thinking and gave me confidence to face product interviews.",
  },
  {
    name: "Shandruth",
    track: "Full Stack Python",
    feedback:
      "Hands-on labs and mentor reviews turned every concept into a mini project.",
  },
  {
    name: "Srinivas",
    track: "Data Science",
    feedback:
      "Capstones + mock interviews made transitioning from support to data seamless.",
  },
];

const hiringLogos = [
  "Google",
  "Microsoft",
  "Apple",
  "Deloitte",
  "Infosys",
  "Salesforce",
  "Amazon",
  "TCS",
  "Accenture",
  "Oracle",
  "Adobe",
  "IBM",
];

const professionals = [
  { name: "Hansika", role: "BIM Designer", img: "/images/prof-1.jpg" },
  { name: "Jai Rishant", role: "Digital Marketing", img: "/images/prof-2.jpg" },
  { name: "Pooja", role: "Jr. Developer", img: "/images/prof-3.jpg" },
  { name: "Praveen", role: "Developer", img: "/images/prof-4.jpg" },
  {
    name: "Siva Kumar",
    role: "Digital Marketing",
    img: "/images/prof-5.jpg",
  },
  {
    name: "Siva Shankar",
    role: "Database Administrator",
    img: "/images/prof-6.jpg",
  },
];

const featuresList = [
  "Free Career Guidance",
  "IIT Approved Curriculum",
  "Dedicated Student Dashboard",
  "Classroom & Online Trainings",
  "Class Recordings",
  "Course Materials",
  "Module Based Assessments",
  "Hands-On Projects",
  "Internship Opportunity",
  "100% Job Assistance",
];

const appBullets = [
  "Interactive video lessons",
  "Mock interviews & assessments",
  "Real-time project tracking",
  "Certification & placement support",
];

const awards = [
  "Most Promising Data Science Training Institutes – 2023",
  "Best Emerging Real-Time Training Academy of the Year",
  "Best Online Training Institute of the Year",
  "Most Innovative Online Education Platform",
  "Most Trusted Education Brand",
  "Indian Iconic Skill & Career Empowering Institute 2025",
];

const sectionCardClasses =
  "rounded-3xl border border-slate-00/80 bg-white/90  p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10";

function AnimatedReveal({
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
      { threshold: 0.2 }
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
          : hiddenTransforms[variant] ?? hiddenTransforms.up
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Landing() {
  const [activeStoryTab, setActiveStoryTab] = useState("learning");
  const storyKeys = [
    { key: "learning", label: "Learning Experience" },
    { key: "placed", label: "Placed Students" },
  ];

  return (
    <main className="min-h-screen  text-slate-900  dark:text-slate-50">
      <div className="mx-auto w-full  space-y-16 px-4 py-16 sm:px-6 lg:px-10">
        {/* Hero Section */}
        <section className={`${sectionCardClasses} grid gap-10 lg:grid-cols-2`}>
          <AnimatedReveal className="space-y-6" variant="left">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">
              Best Coaching Institute
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
              Best Coaching Institute of the Year
            </h1>
            <div className="space-y-2 border-l-2 border-slate-900 pl-4 dark:border-slate-100">
              {acronym.map((item, index) => (
                <AnimatedReveal key={item.letter} delay={index * 80}>
                  <p className="text-lg font-semibold">
                    <span className="mr-3 text-2xl">{item.letter}</span>
                    {item.text}
                  </p>
                </AnimatedReveal>
              ))}
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Teks Academy blends mentorship, real-world projects, and placement
              prep so students take on the future with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Talk to an expert
              </Link>
            </div>
          </AnimatedReveal>
          <AnimatedReveal
            className="flex items-center justify-center"
            variant="right"
          >
            <div className="w-full max-w-md rounded-3xl border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
              <img
                src="/images/books.jpg"
                alt="Students holding books"
                className="mx-auto w-full rounded-2xl object-cover"
              />
            </div>
          </AnimatedReveal>
        </section>

        {/* Collaboration Logos Strip */}
        <section className={`${sectionCardClasses} space-y-4`}>
          <AnimatedReveal className="text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              We Proudly Collaborate with E&ICT Academy, IIT Guwahati
            </h2>
          </AnimatedReveal>
          <div className="flex flex-wrap justify-center gap-6">
            {collaborationLogos.map((logo, index) => (
              <AnimatedReveal
                key={logo}
                delay={index * 70}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300"
                variant="up"
              >
                <div className="rounded-full border border-slate-200 px-6 py-3 dark:border-slate-700">
                  {logo}
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </section>

        {/* Success Stories Section */}
        <section className={`${sectionCardClasses} space-y-8`}>
          <AnimatedReveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Proof of impact
                </p>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Our Success Stories
                </h2>
              </div>
              <div className="flex gap-3">
                {storyKeys.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveStoryTab(tab.key)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                      activeStoryTab === tab.key
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {successStories[activeStoryTab].map((story, index) => (
              <AnimatedReveal key={story.name + index} delay={index * 120}>
                <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  {/* Image */}
                  <div className="h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={story.img}
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Name + Program */}
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {story.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {story.program}
                    </p>
                  </div>

                  <span className="inline-flex text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {story.type}
                  </span>
                </article>
              </AnimatedReveal>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {placementReviews.map((review, index) => (
              <AnimatedReveal key={review.name + index} delay={index * 90}>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  {/* Image */}
                  <div className="h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Name + Track + Feedback */}
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {review.name}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {review.track}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    “{review.feedback}”
                  </p>
                </article>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal className="text-center">
            <button
              type="button"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              View More Success Stories
            </button>
          </AnimatedReveal>
        </section>

        {/* Hiring Partners */}
        <section className={`${sectionCardClasses} space-y-6`}>
          <AnimatedReveal className="space-y-3 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              700+ Hiring Partners
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Get ready to grab your dream job! Join the talent pool with access
              to the world’s best hiring companies.
            </p>
          </AnimatedReveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {hiringLogos.map((logo, index) => (
              <AnimatedReveal key={logo} delay={index * 60} variant="scale">
                <div className="rounded-xl border border-slate-200 px-4 py-6 text-center text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  {logo}
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </section>

        {/* Working Professionals */}
        <section className={`${sectionCardClasses} space-y-6`}>
          <AnimatedReveal className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              We have Created 38000+ Working Professionals
            </h2>
          </AnimatedReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {professionals.map((person, index) => (
              <AnimatedReveal key={index} delay={index * 100}>
                <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {person.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {person.role}
                    </p>
                  </div>
                </article>
              </AnimatedReveal>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Enroll Now
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              Book a Free Demo
            </button>
          </div>
        </section>

        {/* Features + Enquiry Form */}
        <section className={`${sectionCardClasses} grid gap-10 lg:grid-cols-2`}>
          <AnimatedReveal className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Excel with Teks Academy
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuresList.map((feature, index) => (
                <AnimatedReveal key={feature} delay={index * 70}>
                  <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                    {feature}
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </AnimatedReveal>
          <AnimatedReveal variant="right">
            <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  Full name
                  <input
                    type="text"
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-sm">
                  Email
                  <input
                    type="email"
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="name@example.com"
                  />
                </label>
                <label className="text-sm">
                  Mobile number
                  <input
                    type="tel"
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="98765 43210"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  Message
                  <textarea
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    rows={4}
                    placeholder="Share your query"
                  />
                </label>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Request Call Back
              </button>
            </form>
          </AnimatedReveal>
        </section>

        {/* E-Learning App Section */}
        <section className={`${sectionCardClasses} grid gap-8 lg:grid-cols-2`}>
          <AnimatedReveal>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                The Future of Learning is Here
              </h2>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Teks Academy E-Learning App
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Access live and recorded classes, assignments, and mentor
                support from anywhere with the Teks mobile app.
              </p>
              <ul className="space-y-2">
                {appBullets.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-slate-600 dark:text-slate-300"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
                >
                  Download for iOS
                </button>
                <button
                  type="button"
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
                >
                  Download for Android
                </button>
              </div>
            </div>
          </AnimatedReveal>
          <AnimatedReveal
            variant="right"
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-sm rounded-3xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/images/learning.jpg"
                  alt="learning"
                  className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Interactive mobile learning experience
              </p>
            </div>
          </AnimatedReveal>
        </section>

        {/* Awards Section */}
        <section className={`${sectionCardClasses} space-y-6`}>
          <AnimatedReveal className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Awards
            </h2>
          </AnimatedReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {awards.map((award, index) => (
              <AnimatedReveal key={award} delay={index * 80}>
                <article className="rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 transition-transform duration-300 hover:-translate-y-1 hover:rotate-1 dark:border-slate-700 dark:text-slate-200">
                  {award}
                </article>
              </AnimatedReveal>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className={`${sectionCardClasses} grid gap-8 lg:grid-cols-2`}>
          <AnimatedReveal variant="left">
            <div className="rounded-3xl border border-dashed border-slate-300 p-6 dark:border-slate-700">
              {/* Image Box */}
              <div className="h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="/images/success.jpg"
                  alt="success"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Seminars • Live projects • IT collaborations • CRT & PDP
                programs • Mock interviews
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal variant="right" className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
              About Teks Academy
            </p>

            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Teks – Making Job Cracking Easier!
            </h2>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Empower learners through industry-vetted curriculum, mentorship,
                and immersive practice to land roles they love.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Build the most trusted ecosystem for talent creation where every
                student can access career pathways with confidence.
              </p>
            </div>

            <button
              type="button"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              Learn More
            </button>
          </AnimatedReveal>
        </section>
      </div>
    </main>
  );
}

export default Landing;
