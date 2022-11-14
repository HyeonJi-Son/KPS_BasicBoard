import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

//document에 예시로 제작되어 있는 counterSlice. 값을 +1 혹은 -1 해주는 기능을 한다.
//활용해서 돌아가는지...테스트해보자... 
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
          state.value += 1
        },
        decrement: (state) => {
          state.value -= 1
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload
        },
      },
})

export const{ } = counterSlice.actions
export default counterSlice.reducer