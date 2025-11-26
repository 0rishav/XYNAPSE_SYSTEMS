import { AnimatedReveal } from "./Landing";
const sectionCardClasses =
  "rounded-3xl border border-slate-00/80 bg-white/90  p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10";

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

const EnquiryForm = () => {
  return (
    <>
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
    </>
  );
};

export default EnquiryForm;
