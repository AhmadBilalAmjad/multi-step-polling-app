import { createSlice } from '@reduxjs/toolkit';

export interface PollAnswer {
  questionTitle: string;
  answer: string;
}

interface PollState {
  answers: PollAnswer[];
  currentStep: number;
}

const initialState: PollState = {
  answers: [],
  currentStep: 0,
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionTitle, answer } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        a => a.questionTitle === questionTitle
      );
      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex].answer = answer;
      } else {
        state.answers.push({ questionTitle, answer });
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    resetPoll: () => initialState,
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setAnswer, nextStep, previousStep, resetPoll, setCurrentStep } = pollSlice.actions;
export default pollSlice.reducer; 