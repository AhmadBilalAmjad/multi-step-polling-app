import React from 'react'
import { motion } from 'framer-motion'
import { PollAnswer } from '../types/poll'

interface ProgressIndicatorsProps {
  totalSteps: number
  currentStep: number
  onIndicatorClick: (index: number) => void
  isDisabled: boolean
}

export const ProgressIndicators: React.FC<ProgressIndicatorsProps> = ({
  totalSteps,
  currentStep,
  onIndicatorClick,
  isDisabled = false
}) => {
  return (
    <div className='relative bg-slate-50'>
      <div className="absolute top-[-55dvh] md:top-[-50dvh] left-1 flex flex-col space-y-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-5 h-5 rounded-full ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
              } ${index === currentStep ? 'bg-white' : 'bg-indigo-400'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
            onClick={() => !isDisabled && onIndicatorClick(index)}
            data-testid="indicator"
          />
        ))}
      </div>
    </div>
  )
} 