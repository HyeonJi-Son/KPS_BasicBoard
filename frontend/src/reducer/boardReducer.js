import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//TODO: slice
const boardSlice = createSlice({
    name: 'board',
    initialState: { //초기 값들.
        boards: [], //boards 배열이 들어옴.
        //그냥 객체가 들어올 때는 board: null이나 기본값.
    },
    reducers: { //state들의 값을 변경해주는 action. 
        setBoards: (state, action) => {
            state.boards = [...action.payload]
            //나중에 게시물들이 배열로 여러개 들어오기 때문에
            //객체가 아닌 배열 형태로 변경해줄 수 있다.
            //state.boards = [{...action.payload}] <-객체를 배열에 담은 형태
            //state.boards = [...action.payload] <- 배열로 들어오는 형태
        },
    },
});

//export를 적는다는 것은 외부에서도 사용할 수 있도록 해준다는 뜻.
export default boardSlice.reducer;

//TODO: Actions
//다른 컴포넌트에서도 상태를 변경할 수 있도록 해주는 action 함수
export const findAllBoard = () => async (dispatch) => {
    const response = await axios.get('/basicBoard/list');
    dispatch(boardSlice.actions.setBoards(response.data));
}