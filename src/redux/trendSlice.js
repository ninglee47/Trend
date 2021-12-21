import { createSlice } from '@reduxjs/toolkit'

export const trendSlice = createSlice({
  name: 'trend',
  initialState: {
    value: [],
  },
  reducers: {
    updateTrend: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateTrend } = trendSlice.actions

export default trendSlice.reducer