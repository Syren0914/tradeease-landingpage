'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextEffectProps {
  children: string
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  preset?: 'fade-in-blur' | 'slide-up' | 'fade-in'
  speedSegment?: number
  delay?: number
  per?: 'char' | 'word' | 'line'
}

export function TextEffect({ 
  children, 
  as = 'div', 
  className,
  preset = 'fade-in-blur',
  speedSegment = 0.3,
  delay = 0,
  per = 'char'
}: TextEffectProps) {
  const variants = {
    'fade-in-blur': {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  }

  if (as === 'div') {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    )
  }

  if (as === 'span') {
    return (
      <motion.span
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.span>
    )
  }

  if (as === 'h1') {
    return (
      <motion.h1
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.h1>
    )
  }

  if (as === 'h2') {
    return (
      <motion.h2
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.h2>
    )
  }

  if (as === 'h3') {
    return (
      <motion.h3
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.h3>
    )
  }

  if (as === 'p') {
    return (
      <motion.p
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[preset]}
        transition={{
          duration: speedSegment,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.p>
    )
  }

  // Default to div
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={variants[preset]}
      transition={{
        duration: speedSegment,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
} 