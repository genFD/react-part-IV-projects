import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'

const option = {
  reducer: {
    user: userReducer,
  },
}

const store = configureStore(option)
export default store
