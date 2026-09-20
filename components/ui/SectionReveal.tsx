'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// The travel is what causes trouble for motion-sensitive users, so that's
// what's dropped; a short opacity fade is kept so the staggered order of a
// grid still reads. globals.css's prefers-reduced-motion block can't cover
// this — it only neutralises CSS animations/transitions, and these are
// JS-driven transforms.
const reducedVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.2, delay: i * 0.04 },
  }),
};

export function SectionReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // whileInView's own IntersectionObserver check can fire before a page
  // transition has fully settled into its final scroll position, wrongly
  // conclude the section is out of view, and — since viewport.once is true
  // — never re-check. The section then sits at opacity:0 until a real user
  // scroll forces the browser to redo the calculation, which is exactly the
  // "invisible until you scroll down and back up" bug. Checking the actual
  // position ourselves, synchronously before paint, sidesteps that: if the
  // section is already on-screen at mount we animate it in directly instead
  // of trusting the observer's first (unreliable) verdict. Below-the-fold
  // sections are untouched — they still get the normal scroll-triggered
  // reveal, since whileInView works correctly once the page has settled.
  const [forceVisible, setForceVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setForceVisible(true);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={forceVisible ? 'visible' : undefined}
      whileInView={forceVisible ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      variants={reduceMotion ? reducedVariants : variants}
    >
      {children}
    </motion.div>
  );
}

export default SectionReveal;
