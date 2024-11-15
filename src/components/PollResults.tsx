import React from 'react'
import { motion } from 'framer-motion'
import { Step } from '../types/poll'

interface PollResultsProps {
  steps: Step[]
  answers: Record<string, string>
}

export const PollResults: React.FC<PollResultsProps> = ({ steps, answers }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <h2 className="text-4xl font-bold mb-4 text-indigo-600">Your Responses</h2>
      {steps.map((step, index) => (
        <div key={index} className="mb-2 text-2xl">
          <span className="font-semibold">{step.title}</span>{' '}
          {step.options.find(opt => opt.value === answers[index])?.label}
        </div>
      ))}
    </motion.div>
  )
} 