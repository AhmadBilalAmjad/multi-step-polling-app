import { MultiStepPoll } from '../../components/MultiStepPoll'
import { Step } from '../../types/poll'
import { ErrorBoundary } from '../../components/ErrorBoundary'

export default function Home() {
  const pollSteps: Step[] = [
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
    },
    {
      title: 'What did you do well?',
      options: [
        { icon: '🚀', label: 'Very', value: 'very' },
        { icon: '👍', label: 'Somewhat', value: 'somewhat' },
        { icon: '😴', label: 'Not at all', value: 'not' }
      ]
    },
    {
      title: 'What did you do poorly?',
      options: [
        { icon: '👎', label: 'Very', value: 'very' },
        { icon: '👍', label: 'Somewhat', value: 'somewhat' },
        { icon: '😴', label: 'Not at all', value: 'not' }
      ]
    }
  ]

  return (
    <ErrorBoundary
      fallback={
        <div className="error-container">
          <h2>Sorry, something went wrong</h2>
          <p>There was an error loading the poll. Please try again later.</p>
        </div>
      }
    >
      <MultiStepPoll steps={pollSteps} />
    </ErrorBoundary>
  )
}