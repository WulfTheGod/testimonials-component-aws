// Motion configuration and easing curves

export const durations = {
  enter: 0.34,
  hover: 0.15,
  swap: 0.28,
  stars: 0.12,
} as const;

export const easing = {
  enter: [0.22, 1, 0.36, 1],
  swap: [0.2, 0.7, 0.2, 1],
  spring: {
    stiffness: 260,
    damping: 24,
  },
} as const;

export const stagger = {
  children: 0.08,
} as const;

export const transforms = {
  enterY: 16,
  enterScale: 0.98,
  activeScale: 1.01,
  previewScale: 1.0,
  hoverScale: 1.005,
  liftY: -4,
  mobileLiftY: -2,
} as const;

export const variants = {
  section: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.children,
        duration: durations.enter,
        ease: easing.enter,
      },
    },
  },
  card: {
    hidden: {
      opacity: 0,
      y: transforms.enterY,
      scale: transforms.enterScale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: durations.enter,
        ease: easing.enter,
      },
    },
  },
} as const;