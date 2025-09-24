import { createSlice } from '@reduxjs/toolkit';

// Structure: { [customerId]: [ { sessionId, startedAt, endedAt, slideTimes: [...] }, ... ] }
const initialState = {};


const slideAnalyticsSlice = createSlice({
 
  name: 'slideAnalytics',
  initialState,
  reducers: {
    saveSlideSession: (state, action) => {
      const { customerId, sessionId, startedAt, endedAt, slideTimes } = action.payload;
      if (!customerId) return;
      if (!state[customerId]) state[customerId] = [];
      // If sessionId exists, update, else push
      const idx = state[customerId].findIndex(s => s.sessionId === sessionId);
      if (idx !== -1) {
        state[customerId][idx] = { sessionId, startedAt, endedAt, slideTimes };
      } else {
        state[customerId].push({ sessionId, startedAt, endedAt, slideTimes });
      }
    },
  },
});
export const { saveSlideSession } = slideAnalyticsSlice.actions;

export default slideAnalyticsSlice.reducer;
