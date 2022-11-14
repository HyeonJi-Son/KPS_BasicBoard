import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1 // 기본값 0인 변수 value의 값을 1 증감시킨다.
    },
    decrement: (state) => {
      state.value -= 1 // 기본값 0인 변수 value의 값을 1 감소시킨다.
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload //action.payload <- 값을 바로 넘긴다는 뜻?
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => { //setTimeout 타이머 설정을 하여 incrementAsync 작동에 딜레이를 주었다.
    // setTimeout(function{호출될 콜백함수}, delaytime)
    dispatch(incrementByAmount(amount))
  }, 1000)
}
export const selectCount = (state) => state.counter.value

export default counterSlice.reducer