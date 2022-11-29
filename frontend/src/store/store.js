import { configureStore } from '@reduxjs/toolkit'
import RootReducer from '../reducer';
//import counterReducer from '../features/counter/counterSlice'
//만약 Reducer.js에서 export 설정하지 않았다면 import할 수 없다.
//외부에서 사용하겠다고 허용해주지 않았으니까.

export const store = configureStore({
  reducer: RootReducer,
  devTools: true,
})

export default store;