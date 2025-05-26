"use client"

import { motion, AnimatePresence } from "framer-motion"

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.25,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="today" className="flex flex-1 flex-col" {...pageTransition}>
        <p>Dashboard Page</p>
      </motion.div>
    </AnimatePresence>
  )
}
