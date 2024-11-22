interface Option {
  icon: string
  label: string
  value: string
}

interface Step {
  title: string
  options: Option[]
}

interface PollFormProps {
  steps: Step[]
}

interface PollAnswer {
  answer: string;
  questionTitle: string;
}

export type { Option, Step, PollFormProps, PollAnswer };