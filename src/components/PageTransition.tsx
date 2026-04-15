import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down" | "none";
}

const variants = {
  initial: (direction: string) => {
    switch (direction) {
      case "left":
        return { x: 24, opacity: 0 };
      case "right":
        return { x: -24, opacity: 0 };
      case "up":
        return { y: 24, opacity: 0 };
      case "down":
        return { y: -24, opacity: 0 };
      default:
        return { opacity: 0, scale: 0.97 };
    }
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      mass: 0.6
    }
  },
  exit: (direction: string) => {
    switch (direction) {
      case "left":
        return { x: -16, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } };
      case "right":
        return { x: 16, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } };
      case "up":
        return { y: -16, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } };
      case "down":
        return { y: 16, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } };
      default:
        return { opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } };
    }
  }
};

export function PageTransition({
  children,
  className = "",
  direction = "none"
}: PageTransitionProps) {
  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={`min-h-[var(--100dvh,100dvh)] bg-background pt-safe ${className}`}
    >
      {children}
    </motion.div>
  );
}
