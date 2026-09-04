import type { Variants } from 'framer-motion'

/**
 * One motion weight for the whole site: a short rise + fade on scroll-in, once.
 * Everything is gated globally by <MotionConfig reducedMotion="user">, which
 * flattens transforms/opacity for users who ask for reduced motion.
 */

export const EASE = [0.2, 0.6, 0.2, 1] as const
export const DUR = 0.32

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR, ease: EASE },
  },
}

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}

/** Line-by-line mask reveal for the hero headline. */
export const maskLine: Variants = {
  hidden: { y: '100%' },
  show: {
    y: '0%',
    transition: { duration: 0.55, ease: EASE },
  },
}

/** Standard whileInView props for a section block. */
export const inView = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, margin: '-12% 0px -12% 0px' },
}
