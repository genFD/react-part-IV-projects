import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'
const option = {
  reducer: {
    user: userReducer,
    cart: cartReducer,
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  },
}

const store = configureStore(option)
export default store
