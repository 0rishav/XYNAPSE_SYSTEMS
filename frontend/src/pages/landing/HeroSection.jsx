import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedReveal } from "./Landing";

const sectionCardClasses =
  "relative rounded-3xl p-6 sm:p-10 shadow-lg bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/70 overflow-hidden";

const acronym = [
  { letter: "X", text: "eXcellence" },
  { letter: "Y", text: "Your" },
  { letter: "N", text: "Next-gen" },
  { letter: "A", text: "Analytics" },
  { letter: "P", text: "Platforms" },
  { letter: "S", text: "Solutions" },
  { letter: "E", text: "Engineering" },
];

const HeroSection = () => {
  const bubbleCanvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = bubbleCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    const TOTAL = 14;
    let bubbles = [];

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const initBubbles = () => {
      resizeCanvas();
      bubbles = Array.from({ length: TOTAL }).map(() => {
        const baseR = 22 + Math.random() * 20;
        return {
          baseR,
          r: baseR,
          targetR: baseR,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: -0.2 + Math.random() * 0.4,
          vy: -0.2 + Math.random() * 0.4,
        };
      });
    };

    const pickPulseGroup = () => {
      const ids = [...Array(TOTAL).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      bubbles.forEach((b, i) => {
        b.targetR = ids.includes(i) ? b.baseR * 2.2 : b.baseR;
      });
    };

    const drawBubble = (b) => {
      const gradient = ctx.createRadialGradient(
        b.x - b.r * 0.3,
        b.y - b.r * 0.3,
        b.r * 0.2,
        b.x,
        b.y,
        b.r,
      );

      gradient.addColorStop(0, "rgba(186,230,253,0.85)");
      gradient.addColorStop(0.5, "rgba(56,189,248,0.45)");
      gradient.addColorStop(1, "rgba(14,165,233,0.15)");

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(56,189,248,0.45)";
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0 || b.x + b.r > canvas.width) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > canvas.height) b.vy *= -1;

        b.r += (b.targetR - b.r) * 0.05;
        drawBubble(b);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initBubbles();
    pickPulseGroup();
    const interval = setInterval(pickPulseGroup, 3500);
    animate();

    window.addEventListener("resize", initBubbles);

    return () => {
      window.removeEventListener("resize", initBubbles);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${sectionCardClasses} grid gap-10 lg:grid-cols-2`}
    >
      {/* Bubble Background */}
      <canvas
        ref={bubbleCanvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Left Content */}
      <AnimatedReveal className="relative z-10 space-y-6" variant="left">
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
          XYNAPSE SYSTEMS blends mentorship, real-world projects, and placement
          prep so students take on the future with confidence.
        </p>

        <Link
          to="/contact"
          className="inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
        >
          Talk to an expert
        </Link>
      </AnimatedReveal>

      {/* Right Image */}
      <AnimatedReveal
        className="relative z-10 flex items-center justify-center"
        variant="right"
      >
        <video
          src="https://res.cloudinary.com/dcll0n88n/video/upload/v1769151409/Untitled_design_4_lsbwf3.mp4"
          autoPlay
          muted
          playsInline
          loop
          className="w-full max-w-md h-96 rounded-3xl object-cover shadow-md"
        />
      </AnimatedReveal>
    </section>
  );
};

export default HeroSection;
