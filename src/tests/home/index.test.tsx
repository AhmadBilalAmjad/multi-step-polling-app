import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import pollReducer from '../../store/pollSlice'
import { MultiStepPoll } from '../../components/MultiStepPoll'
import { ProgressIndicators } from '../../components/ProgressIndicators'

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

const createTestStore = () =>
  configureStore({
    reducer: {
      poll: pollReducer,
    },
  });

const renderWithProvider = (component: React.ReactElement) => {
  const store = createTestStore();

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('MultiStepPoll', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the first question', () => {
    renderWithProvider(<MultiStepPoll steps={mockSteps} />)
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument()
  })

  it('displays all options for the first question', () => {
    renderWithProvider(<MultiStepPoll steps={mockSteps} />)
    expect(screen.getByText('👍')).toBeInTheDocument()
    expect(screen.getByText('🤔')).toBeInTheDocument()
    expect(screen.getByText('👎')).toBeInTheDocument()
  })

  it('moves to the next question when an option is selected', async () => {
    renderWithProvider(<MultiStepPoll steps={mockSteps} />)
    fireEvent.click(screen.getByText('👍'))
    await waitFor(() => {
      expect(screen.getByText('How productive were you?')).toBeInTheDocument()
    })
  })
})

// Add ProgressIndicators tests
describe('ProgressIndicators', () => {
  it('renders correct number of indicators', () => {
    render(
      <ProgressIndicators
        totalSteps={3}
        currentStep={0}
        onIndicatorClick={() => { }}
        isDisabled={false}
      />
    )

    const indicators = screen.getAllByTestId('indicator');
    expect(indicators).toHaveLength(3);
    indicators.forEach((indicator: HTMLElement) => {
      expect(indicator).toHaveClass('rounded-full');
    });
  })

  it('highlights current step indicator', () => {
    render(
      <ProgressIndicators
        totalSteps={3}
        currentStep={1}
        onIndicatorClick={() => { }}
        isDisabled={false}
      />
    )

    const indicators = screen.getAllByTestId('indicator')
    expect(indicators[1]).toHaveClass('bg-white')
  })

  it('disables clicks when isDisabled is true', () => {
    const mockClick = jest.fn()
    render(
      <ProgressIndicators
        totalSteps={3}
        currentStep={0}
        onIndicatorClick={mockClick}
        isDisabled={true}
      />
    )

    const indicators = screen.getAllByTestId('indicator')
    fireEvent.click(indicators[1])
    expect(mockClick).not.toHaveBeenCalled()
  })
})

export { renderWithProvider }