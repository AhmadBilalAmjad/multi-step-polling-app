import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { PollFormProps } from '../types/poll'
import { PollOption } from './PollOption'
import { ProgressIndicators } from './ProgressIndicators'
import { PollResults } from './PollResults'

export const MultiStepPoll: React.FC<PollFormProps> = ({ steps, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOptionSelect = (value: string) => {
    if (isSubmitting) return

    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [currentStep]: value }
      if (currentStep === steps.length - 1 && Object.keys(newAnswers).length === steps.length) {
        handleSubmit(newAnswers)
      } else if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
      return newAnswers
    })
  }

  const handleSubmit = async (finalAnswers: Record<string, string>) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(finalAnswers)
      setIsCompleted(true)
      triggerConfetti()
    } catch (error) {
      console.error('Error submitting poll:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  useEffect(() => {
    if (isCompleted) {
      triggerConfetti()
    }
  }, [isCompleted, triggerConfetti])

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
      opacity: 0
    })
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-4/12 sm:w-6/12 lg:w-4/12 bg-indigo-600 p-8 flex flex-col justify-between items-start relative">
        <motion.h2
          className="text-4xl font-bold text-white mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          M
        </motion.h2>
        <motion.h1
          key={currentStep}
          className="text-5xl font-bold text-white mb-8 max-w-md ml-20 leading-snug"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isCompleted ? "Thank you for your feedback!" : steps[currentStep].title}
        </motion.h1>
        <ProgressIndicators totalSteps={steps.length} currentStep={currentStep} />
      </div>

      {/* Right Panel */}
      <div className="w-8/12 sm:w-6/12 lg:w-8/12 p-8 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {!isCompleted ? (
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full max-w-md"
            >
              <div className="flex justify-between">
                {steps[currentStep].options.map((option, index) => (
                  <PollOption
                    key={index}
                    option={option}
                    isSelected={answers[currentStep] === option.value}
                    isHovered={hoveredOption === option.value}
                    onHoverStart={() => setHoveredOption(option.value)}
                    onHoverEnd={() => setHoveredOption(null)}
                    onClick={() => handleOptionSelect(option.value)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <PollResults steps={steps} answers={answers} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 