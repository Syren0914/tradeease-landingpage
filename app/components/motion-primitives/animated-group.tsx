'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGroupProps {
  children: React.ReactNode
  className?: string
  variants?: any
}

export function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  )
} 