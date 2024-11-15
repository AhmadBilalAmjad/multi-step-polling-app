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
    }
  ]

  const handleSubmit = async (answers: Record<string, string>) => {
    try {
      // Simulate API call to mock server
      const response = await fetch('/api/submit-poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error('Failed to submit poll');
      }

      const data = await response.json();
      console.log('Poll submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting poll:', error);
      throw error;
    }
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="error-container">
          <h2>Sorry, something went wrong</h2>
          <p>There was an error loading the poll. Please try again later.</p>
        </div>
      }
    >
      <MultiStepPoll steps={pollSteps} onSubmit={handleSubmit} />
    </ErrorBoundary>
  )
}