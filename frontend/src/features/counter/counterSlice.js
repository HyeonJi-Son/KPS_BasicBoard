import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1 // 기본값 0인 변수 value의 값을 1 증감시킨다.
    },
    decrement: (state) => {
      state.value -= 1 // 기본값 0인 변수 value의 값을 1 감소시킨다.
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload 
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
export const selectCount = (state) => state.counter.value

export default counterSlice.reducer