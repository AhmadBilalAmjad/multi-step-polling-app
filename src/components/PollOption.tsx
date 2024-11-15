import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Option } from '../types/poll'

interface PollOptionProps {
  option: Option
  isSelected: boolean
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onClick: () => void
}

export const PollOption: React.FC<PollOptionProps> = ({
  option,
  isSelected,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick
}) => {
  return (
    <motion.div
      className={`cursor-pointer h-32 p-4 rounded-lg ${isSelected ? 'bg-indigo-100' : 'hover:bg-gray-100'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      <div className="text-6xl mb-2">{option.icon}</div>
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-center text-gray-600"
          >
            {option.label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 