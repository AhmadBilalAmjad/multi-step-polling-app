import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, AppDispatch } from '../store/store'
import { PollFormProps } from '../types/poll'
import { PollOption } from './PollOption'
import { ProgressIndicators } from './ProgressIndicators'
import { PollResults } from './PollResults'
import { setAnswer, nextStep, setCurrentStep } from '../store/pollSlice'
import { useSubmitPollMutation } from '../services/pollApi'

export const MultiStepPoll: React.FC<PollFormProps> = ({ steps }) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentStep = useSelector((state: RootState) => state.poll.currentStep)
  const answers = useSelector((state: RootState) => state.poll.answers)
  const [submitPoll, { status }] = useSubmitPollMutation()

  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const isCompleted = status === 'fulfilled'
  const isSubmitting = status === 'pending'

  const handleOptionSelect = (value: string) => {
    if (isSubmitting) return

    const newAnswer = {
      questionTitle: steps[currentStep].title,
      answer: value
    }

    dispatch(setAnswer(newAnswer))

    if (currentStep === steps.length - 1) {
      void submitPoll([...answers, newAnswer])
    } else if (currentStep < steps.length - 1) {
      dispatch(nextStep())
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
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-6/12 lg:w-4/12 bg-indigo-600 p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-start relative">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          M
        </motion.h2>
        <motion.h1
          key={currentStep}
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 max-w-md leading-tight sm:leading-snug ${isCompleted ? 'text-center self-center' : 'ml-8 sm:ml-12 lg:ml-20'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isCompleted ? "Thank you for your feedback!" : steps[currentStep].title}
        </motion.h1>
        {!isCompleted ? (
          <ProgressIndicators
            totalSteps={steps.length}
            currentStep={currentStep}
            onIndicatorClick={(index) => {
              if (index < answers.length) {
                dispatch(setCurrentStep(index))
              }
            }}
            isDisabled={isCompleted}
          />
        ) : (
          <div className="w-full h-12 bg-indigo-400 rounded-md flex justify-center items-center text-white mt-4">
            See the results in right panel
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-6/12 lg:w-8/12 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
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
              <div className="flex flex-col md:flex-row justify-between items-center">
                {isSubmitting ? (
                  <div className="w-full h-10 text-indigo-600 text-center text-lg sm:text-xl lg:text-2xl rounded-md animate-pulse">
                    Submitting, please wait...
                  </div>
                ) : (
                  steps[currentStep].options.map((option, index) => (
                    <PollOption
                      key={index}
                      option={option}
                      isSelected={answers[currentStep]?.answer === option.value}
                      isHovered={hoveredOption === option.value}
                      onHoverStart={() => setHoveredOption(option.value)}
                      onHoverEnd={() => setHoveredOption(null)}
                      onClick={() => handleOptionSelect(option.value)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          ) : (
            <PollResults
              steps={steps}
              answers={Object.fromEntries(answers.map(a => [a.questionTitle, a.answer]))}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 