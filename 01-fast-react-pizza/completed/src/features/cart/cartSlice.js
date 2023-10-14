import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: 'Medit',
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
}
const options = {
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      //payload = newItem
      state.cart.push(action.payload)
    },
    deleteItem: (state, action) => {
      //payload = item.id

      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    clearCart: (state) => {
      state.cart = []
    },
    increaseItemsQuantity: (state, action) => {
      //payload = item.id
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemsQuantity: (state, action) => {
      //payload = item.id
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
  },
}
const cartSlice = createSlice(options)

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemsQuantity,
  decreaseItemsQuantity,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((curr, item) => curr + item.quantity, 0)

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((curr, item) => curr + item.totalPrice, 0)

export const getCurrentQuantityById = (id) => (state) => {
  const item = state.cart.cart.find((item) => item.pizzaId === id)
  if (item) return item.quantity
  return 0
}
