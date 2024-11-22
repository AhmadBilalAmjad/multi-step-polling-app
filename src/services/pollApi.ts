import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PollAnswer } from '../store/pollSlice';

interface SubmitPollResponse {
  id: number;
  answers: PollAnswer[];
}

export const pollApi = createApi({
  reducerPath: 'pollApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (builder) => ({
    submitPoll: builder.mutation<SubmitPollResponse, PollAnswer[]>({
      query: (answers) => ({
        url: '/posts',
        method: 'POST',
        body: { answers },
      }),
    }),
  }),
});

export const { useSubmitPollMutation } = pollApi; 