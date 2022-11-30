import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./boardReducer";
import memberReducer from "./memberReducer"

//↓원래 각각 Reducer에서 state를 export해주던 것을
//RootReducer에서 한번에 관리해주도록 한다.
                    //↓combineReducers가 Reducer들을 연결시켜주는 역할을 하는 함수.
const RootReducer = combineReducers({
    board: boardReducer,
    member: memberReducer   
});

export default RootReducer;