import { createSlice } from '@reduxjs/toolkit'

export const trendSlice = createSlice({
  name: 'trend',
  initialState: {
    valueGoogle: [],
    valueYoutube: [],
    valueTwitter: [],
    tagData: []
  },
  reducers: {
    updateGoogleTrend: (state, action) => {
      state.valueGoogle = action.payload
    },
    updateYoutubeTrend: (state, action) => {
      state.valueYoutube = action.payload
    },
    updateTwitterTrend: (state, action) => {
      state.valueTwitter = action.payload
    },
    updateTagData: (state, action) => {
      state.tagData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateGoogleTrend, updateYoutubeTrend, updateTwitterTrend, updateTagData } = trendSlice.actions

export default trendSlice.reducer