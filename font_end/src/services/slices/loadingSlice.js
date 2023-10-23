import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading(state, action) {
      console.log('a')
      return action.payload
    },
  },
})

const { actions, reducer } = loadingSlice
export const GetLoading = (state) => state.loading
export const { setLoading } = actions
export default reducer
