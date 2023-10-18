import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    addCart(state, action) {
      const index = state.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        state[index].soLuong = state[index].soLuong + action.payload.soLuong
      } else {
        state.push(action.payload)
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeCart(state, action) {
      const index = state.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    updateCart(state, action) {
      const itemIndex = state.findIndex((e) => e.id === action.payload.id)
      if (itemIndex !== -1) {
        state[itemIndex] = action.payload
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
  },
})

const { actions, reducer } = cartSlice
export const GetCart = (state) => state.cart
export const { addCart, removeCart, updateCart } = actions
export default reducer
