import { createSlice } from '@reduxjs/toolkit'

export const trendSlice = createSlice({
  name: 'trend',
  initialState: {
    valueGoogle: [],
    valueYoutube: []
  },
  reducers: {
    updateGoogleTrend: (state, action) => {
      state.valueGoogle = action.payload
    },
    updateYoutubeTrend: (state, action) => {
      state.valueYoutube = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateGoogleTrend, updateYoutubeTrend } = trendSlice.actions

export default trendSlice.reducer