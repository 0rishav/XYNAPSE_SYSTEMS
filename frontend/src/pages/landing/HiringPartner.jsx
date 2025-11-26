import { useState } from "react";
import { AnimatedReveal } from "./Landing";
import { useRef } from "react";
import { useEffect } from "react";

const sectionCardClasses =
  "rounded-3xl border border-slate-00/80 bg-white/90  p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 sm:p-10";

const hiringLogos = [
  { name: "Google", domain: "google.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Deloitte", domain: "deloitte.com" },
  { name: "Infosys", domain: "infosys.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "TCS", domain: "tcs.com" },
  { name: "Accenture", domain: "accenture.com" },
  { name: "Oracle", domain: "oracle.com" },
  { name: "Adobe", domain: "adobe.com" },
  { name: "IBM", domain: "ibm.com" },
];

const HiringPartner = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const targetNumber = 750;

  useEffect(() => {
    let observer;
    let interval;

    const animateCounter = () => {
      let current = 0;
      const increment = Math.ceil(targetNumber / 100); 
      interval = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(interval);
        }
        setCount(current);
      }, 10);
    };

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(ref.current);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (observer && ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <>
      <section className={`${sectionCardClasses} space-y-6`}>
        <AnimatedReveal className="space-y-3 text-center">
          <h2
            ref={ref}
            className="text-3xl font-semibold text-slate-900 dark:text-white"
          >
            {count}+
            <span className="ml-1 text-base font-medium text-gray-500">
              Hiring Partners
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Get ready to grab your dream job! Join the talent pool with access
            to the world’s best hiring companies.
          </p>
        </AnimatedReveal>

        <style>{`
                  .marquee { overflow: hidden; position: relative; }
                  .marquee-track { display: flex; gap: 24px; align-items: center; }
                  .marquee-item { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; padding: 12px 18px; border-radius: 12px; background: transparent; }
                  .marquee-item img { height: 40px; width: auto; display: block; filter: none; }
      
                  @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                  @keyframes scroll-right { from { transform: translateX(0); } to { transform: translateX(50%); } }
      
                  .marquee-track.scroll-left { animation: scroll-left 28s linear infinite; }
                  .marquee-track.scroll-right { animation: scroll-right 26s linear infinite; }
      
                  /* Slight pause on hover */
                  .marquee-track:hover { animation-play-state: paused; }
                `}</style>

        <div className="marquee">
          <div className="marquee-track scroll-right">
            {[...hiringLogos, ...hiringLogos].map((l, i) => (
              <div key={`top-${l.domain}-${i}`} className="marquee-item">
                <img
                  src={`https://logo.clearbit.com/${l.domain}?size=128`}
                  alt={l.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-4" />

        <div className="marquee">
          <div className="marquee-track scroll-left">
            {[...hiringLogos, ...hiringLogos].map((l, i) => (
              <div key={`bot-${l.domain}-${i}`} className="marquee-item">
                <img
                  src={`https://logo.clearbit.com/${l.domain}?size=128`}
                  alt={l.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HiringPartner;
