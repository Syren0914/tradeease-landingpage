'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextEffectProps {
  children: string
  as?: keyof JSX.IntrinsicElements
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
  const Component = motion[as] as any

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

  return (
    <Component
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
    </Component>
  )
} 