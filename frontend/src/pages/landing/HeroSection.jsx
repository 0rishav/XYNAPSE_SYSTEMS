import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedReveal } from "./Landing";

const sectionCardClasses =
  "rounded-3xl p-6 sm:p-10 shadow-lg bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/70";

const acronym = [
  { letter: "T", text: "Transferring" },
  { letter: "E", text: "Expert’s" },
  { letter: "K", text: "Knowledge to" },
  { letter: "S", text: "Students" },
];

const HeroSection = () => {
  const bubbleCanvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = bubbleCanvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const TOTAL = 12;
    let bubbles = [];

    const initBubbles = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      bubbles = Array.from({ length: TOTAL }).map(() => {
        const baseR = 15 + Math.random() * 20;
        return {
          baseR,
          r: baseR,
          targetR: baseR,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -0.3 + Math.random() * 0.6,
          vy: -0.3 + Math.random() * 0.6,
        };
      });
    };

    const pickPulseGroup = () => {
      const ids = [...Array(TOTAL).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      bubbles.forEach((b, i) => {
        b.targetR = ids.includes(i) ? b.baseR * 2.2 : b.baseR;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        // Bounce edges
        if (b.x - b.r < 0 || b.x + b.r > canvas.width) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > canvas.height) b.vy *= -1;

        b.r += (b.targetR - b.r) * 0.05;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(14,165,233,0.15)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(14,165,233,0.25)";
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    initBubbles();
    pickPulseGroup();
    const interval = setInterval(pickPulseGroup, 3500);
    animate();

    const handleResize = () => {
      initBubbles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={`${sectionCardClasses} grid gap-10 lg:grid-cols-2`}>
      {/* Left Content */}
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

      {/* Right Image Card with Bubble Background */}
      <AnimatedReveal
        className="flex items-center justify-center"
        variant="right"
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-md rounded-3xl overflow-hidden border border-dashed border-slate-300 dark:border-slate-700 h-96"
        >
          {/* Bubble Canvas */}
          <canvas
            ref={bubbleCanvasRef}
            className="absolute top-0 left-0 w-full h-full z-0"
          />
          {/* Image */}
          <img
            src="/images/books.jpg"
            alt="Students holding books"
            className="relative z-10 w-full h-full object-cover rounded-2xl"
          />
        </div>
      </AnimatedReveal>
    </section>
  );
};

export default HeroSection;
