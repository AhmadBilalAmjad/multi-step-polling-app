import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { MultiStepPoll } from '../../components/MultiStepPoll'

// Mock canvas-confetti
jest.mock('canvas-confetti', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockSteps = [
  {
    title: 'How was your week overall?',
    options: [
      { icon: '👍', label: 'Good', value: 'good' },
      { icon: '🤔', label: 'Neutral', value: 'neutral' },
      { icon: '👎', label: 'Bad', value: 'bad' }
    ]
  },
  {
    title: 'How productive were you?',
    options: [
      { icon: '🚀', label: 'Very', value: 'very' },
      { icon: '👍', label: 'Somewhat', value: 'somewhat' },
      { icon: '😴', label: 'Not at all', value: 'not' }
    ]
  }
]

const mockOnSubmit = jest.fn()

describe('MultiStepPoll', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the first question', () => {
    render(<MultiStepPoll steps={mockSteps} onSubmit={mockOnSubmit} />)
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument()
  })

  it('displays all options for the first question', () => {
    render(<MultiStepPoll steps={mockSteps} onSubmit={mockOnSubmit} />)
    expect(screen.getByText('👍')).toBeInTheDocument()
    expect(screen.getByText('🤔')).toBeInTheDocument()
    expect(screen.getByText('👎')).toBeInTheDocument()
  })

  it('moves to the next question when an option is selected', async () => {
    render(<MultiStepPoll steps={mockSteps} onSubmit={mockOnSubmit} />)
    fireEvent.click(screen.getByText('👍'))
    await waitFor(() => {
      expect(screen.getByText('How productive were you?')).toBeInTheDocument()
    })
  })

})