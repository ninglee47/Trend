import { configureStore } from '@reduxjs/toolkit'
import trendReducer from './trendSlice'


export default configureStore({
  reducer: {
      trend: trendReducer,
  },
})
