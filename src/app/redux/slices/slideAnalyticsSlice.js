import { createSlice } from '@reduxjs/toolkit';

// Structure: { [customerId]: [ { sessionId, startedAt, endedAt, slideTimes: [...] }, ... ] }
const initialState = {};


const slideAnalyticsSlice = createSlice({
 
  name: 'slideAnalytics',
  initialState,
  reducers: {
    saveSlideSession: (state, action) => {
      const { customerId, sessionId, startedAt, endedAt, slideTimes } = action.payload;
      console.log("customerId",customerId);
      console.log("sessionId",sessionId);
      console.log("startedAt",startedAt);
      console.log("endedAt",endedAt);
      console.log("slidesssss",slideTimes);
      if (!customerId) return;
      if (!state[customerId]) state[customerId] = [];
      // If sessionId exists, update, else push
      const idx = state[customerId].findIndex(s => s.sessionId === sessionId);
      if (idx !== -1) {
        state[customerId][idx] = { sessionId, startedAt, endedAt, slideTimes };
      } else {
        state[customerId].push({ sessionId, startedAt, endedAt, slideTimes });
      }
      console.log("eeee",state);
    },
  },
});
console.log("slideAnalyticsSlice",slideAnalyticsSlice);
export const { saveSlideSession } = slideAnalyticsSlice.actions;
console.log("saveSlideSession",saveSlideSession);

export default slideAnalyticsSlice.reducer;
