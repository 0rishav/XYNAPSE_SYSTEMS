import { Link } from "react-router-dom";
import { AnimatedReveal } from "./Landing";

const sectionCardClasses =
  "rounded-3xl border border-slate-00/80 bg-white/90  p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10";

const acronym = [
  { letter: "T", text: "Transferring" },
  { letter: "E", text: "Expert’s" },
  { letter: "K", text: "Knowledge to" },
  { letter: "S", text: "Students" },
];

const HeroSection = () => {
  return (
    <>
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
    </>
  );
};

export default HeroSection;
