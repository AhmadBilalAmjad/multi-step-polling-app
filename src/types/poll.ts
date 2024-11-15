export interface Option {
  icon: string
  label: string
  value: string
}

export interface Step {
  title: string
  options: Option[]
}

export interface PollFormProps {
  steps: Step[]
  onSubmit: (answers: Record<string, string>) => Promise<void>
} 